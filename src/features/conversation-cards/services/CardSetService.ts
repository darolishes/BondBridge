import { Platform } from "react-native";
import type { CardSet } from "../types";

export interface UploadProgress {
  loaded: number;
  total: number;
}

export type UploadStatus = "idle" | "pending" | "success" | "error";

export interface CardSetUploadState {
  status: UploadStatus;
  progress: number;
  error: string | null;
}

export interface CardSetService {
  uploadSet(file: File | string): Promise<CardSet>;
  validateSet(data: unknown): data is CardSet;
  processUpload(data: CardSet): Promise<void>;
  getUploadState(): CardSetUploadState;
}

export class CardSetValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CardSetValidationError";
  }
}

// Basis-Implementierung für gemeinsame Funktionalität
export abstract class BaseCardSetService implements CardSetService {
  protected uploadState: CardSetUploadState = {
    status: "idle",
    progress: 0,
    error: null,
  };

  abstract uploadSet(file: File | string): Promise<CardSet>;

  validateSet(data: unknown): data is CardSet {
    if (!data || typeof data !== "object") {
      throw new CardSetValidationError("Ungültiges Kartenset-Format");
    }

    const cardSet = data as Partial<CardSet>;

    if (!cardSet.id || typeof cardSet.id !== "string") {
      throw new CardSetValidationError("ID fehlt oder ist ungültig");
    }

    if (!cardSet.name || typeof cardSet.name !== "string") {
      throw new CardSetValidationError("Name fehlt oder ist ungültig");
    }

    if (!Array.isArray(cardSet.cards) || cardSet.cards.length === 0) {
      throw new CardSetValidationError("Keine gültigen Karten gefunden");
    }

    // Weitere Validierungslogik hier...

    return true;
  }

  async processUpload(data: CardSet): Promise<void> {
    try {
      this.updateUploadState({ status: "pending", progress: 0 });

      // Validierung
      if (!this.validateSet(data)) {
        throw new CardSetValidationError("Validierung fehlgeschlagen");
      }

      // Hier später: Speicherung in Redux/AsyncStorage

      this.updateUploadState({ status: "success", progress: 100 });
    } catch (error) {
      this.updateUploadState({
        status: "error",
        error: error instanceof Error ? error.message : "Unbekannter Fehler",
      });
      throw error;
    }
  }

  getUploadState(): CardSetUploadState {
    return this.uploadState;
  }

  protected updateUploadState(update: Partial<CardSetUploadState>) {
    this.uploadState = {
      ...this.uploadState,
      ...update,
      error: update.status === "error" ? update.error || null : null,
    };
  }
}

// Factory für plattformspezifische Implementierungen
export const createCardSetService = (): CardSetService => {
  if (Platform.OS === "web") {
    const { WebCardSetService } = require("./cardsets/WebCardSetService");
    return new WebCardSetService();
  } else {
    const { NativeCardSetService } = require("./cardsets/NativeCardSetService");
    return new NativeCardSetService();
  }
};

export default createCardSetService();
