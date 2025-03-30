import { BaseCardSetService } from "../CardSetService";
import type { CardSet } from "../../types";
import * as DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";

export class NativeCardSetService extends BaseCardSetService {
  async uploadSet(_: string): Promise<CardSet> {
    try {
      // Datei über Document Picker auswählen
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.json],
        copyTo: "cachesDirectory",
      });

      const localPath = response.fileCopyUri || response.uri;

      if (!localPath) {
        throw new Error("Keine gültige Datei ausgewählt");
      }

      // Fortschritt für größere Dateien tracken
      let progress = 0;

      // Datei einlesen
      const content = await RNFS.readFile(localPath, {
        encoding: "utf8",
        progress: (received: number, total: number) => {
          progress = Math.round((received / total) * 100);
          this.updateUploadState({ progress });
        },
      });

      // JSON parsen und validieren
      const data = JSON.parse(content);

      if (this.validateSet(data)) {
        await this.processUpload(data);

        // Temporäre Datei aufräumen
        if (response.fileCopyUri) {
          await RNFS.unlink(response.fileCopyUri);
        }

        return data;
      }

      throw new Error("Ungültiges Kartenset-Format");
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        this.updateUploadState({
          status: "error",
          error: "Upload abgebrochen",
        });
      } else {
        this.updateUploadState({
          status: "error",
          error:
            error instanceof Error ? error.message : "Fehler beim Datei-Upload",
        });
      }
      throw error;
    }
  }
}
