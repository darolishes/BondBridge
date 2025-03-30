import { BaseCardSetService, UploadProgress } from "../CardSetService";
import type { CardSet } from "../../types";

export class WebCardSetService extends BaseCardSetService {
  async uploadSet(file: File): Promise<CardSet> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onprogress = (event: ProgressEvent) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          this.updateUploadState({ progress });
        }
      };

      reader.onload = async () => {
        try {
          const content = reader.result as string;
          const data = JSON.parse(content);

          if (this.validateSet(data)) {
            await this.processUpload(data);
            resolve(data);
          }
        } catch (error) {
          this.updateUploadState({
            status: "error",
            error:
              error instanceof Error
                ? error.message
                : "Fehler beim Datei-Upload",
          });
          reject(error);
        }
      };

      reader.onerror = () => {
        const error = new Error("Fehler beim Lesen der Datei");
        this.updateUploadState({
          status: "error",
          error: error.message,
        });
        reject(error);
      };

      reader.readAsText(file);
    });
  }
}
