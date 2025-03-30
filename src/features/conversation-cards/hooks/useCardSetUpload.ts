import { useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCardSet } from "../../../store/slices/cardsSlice";
import type {
  CardSet,
  CardSetImportProgress,
} from "../../../common/types/card";

interface UseCardSetUploadResult {
  uploadCardSet: (file: File) => Promise<void>;
  progress: CardSetImportProgress | null;
  error: string | null;
  isUploading: boolean;
  reset: () => void;
}

export function useCardSetUpload(): UseCardSetUploadResult {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState<CardSetImportProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  const cleanup = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setProgress(null);
    setError(null);
    setIsUploading(false);
    cleanup();
  }, [cleanup]);

  const uploadCardSet = useCallback(
    async (file: File) => {
      try {
        reset();
        setIsUploading(true);

        // File-Typ-Validierung
        if (!file.type.includes("json")) {
          throw new Error("Nur JSON-Dateien sind erlaubt");
        }

        // Worker erstellen
        workerRef.current = new Worker(
          new URL("../services/cardSetWorker.ts", import.meta.url)
        );

        // Progress und Completion Handler
        return new Promise<void>((resolve, reject) => {
          if (!workerRef.current) {
            reject(new Error("Worker konnte nicht erstellt werden"));
            return;
          }

          workerRef.current.onmessage = (event) => {
            const { type, data } = event.data;

            switch (type) {
              case "progress":
                setProgress(data as CardSetImportProgress);
                break;

              case "complete":
                const cardSet = data as CardSet;
                dispatch(addCardSet(cardSet));
                setProgress({
                  total: 100,
                  current: 100,
                  status: "complete",
                });
                setIsUploading(false);
                cleanup();
                resolve();
                break;

              case "error":
                const error = data as Error;
                setError(error.message);
                setProgress({
                  total: 100,
                  current: 0,
                  status: "error",
                  error: error.message,
                });
                setIsUploading(false);
                cleanup();
                reject(error);
                break;

              default:
                console.warn("Unbekannter Worker-Message-Typ:", type);
            }
          };

          // Fehlerbehandlung für Worker
          workerRef.current.onerror = (error) => {
            setError("Worker-Fehler: " + error.message);
            setProgress({
              total: 100,
              current: 0,
              status: "error",
              error: error.message,
            });
            setIsUploading(false);
            cleanup();
            reject(error);
          };

          // Datei einlesen und an Worker senden
          const reader = new FileReader();
          reader.onload = () => {
            if (workerRef.current && reader.result) {
              workerRef.current.postMessage({
                type: "import",
                file: reader.result,
              });
            }
          };
          reader.onerror = () => {
            setError("Fehler beim Lesen der Datei");
            setProgress({
              total: 100,
              current: 0,
              status: "error",
              error: "Fehler beim Lesen der Datei",
            });
            setIsUploading(false);
            cleanup();
            reject(new Error("Fehler beim Lesen der Datei"));
          };
          reader.readAsText(file);
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unbekannter Fehler";
        setError(message);
        setProgress({
          total: 100,
          current: 0,
          status: "error",
          error: message,
        });
        setIsUploading(false);
        cleanup();
        throw error;
      }
    },
    [dispatch, cleanup, reset]
  );

  return {
    uploadCardSet,
    progress,
    error,
    isUploading,
    reset,
  };
}
