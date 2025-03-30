import { FileService } from "./FileService";

/**
 * FileWorkerPool Implementation
 * Manages multiple file operations concurrently
 */
export class FileWorkerPool {
  private workers: Worker[] = [];
  private queue: (() => Promise<void>)[] = [];
  private activeWorkers = 0;

  constructor(
    private fileService: FileService,
    private maxWorkers: number = 4
  ) {}

  private async workerTask(): Promise<void> {
    while (true) {
      if (this.queue.length === 0) {
        this.activeWorkers--;
        return;
      }

      const task = this.queue.shift()!;
      await task();
    }
  }

  private createWorker(): void {
    const worker = new Worker(new URL("./fileWorker.ts", import.meta.url));
    worker.onmessage = (event) => {
      const { path, content, method, resolve, reject } = event.data;

      (async () => {
        try {
          let result;
          switch (method) {
            case "readFile":
              result = await this.fileService.readFile(path);
              break;
            case "writeFile":
              result = await this.fileService.writeFile(path, content);
              break;
            case "fileExists":
              result = await this.fileService.fileExists(path);
              break;
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })();
    };
    this.workers.push(worker);
  }

  private ensureWorkers(): void {
    while (this.workers.length < this.maxWorkers) {
      this.createWorker();
    }
  }

  private enqueueTask<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (this.activeWorkers < this.maxWorkers) {
        this.activeWorkers++;
        this.ensureWorkers();
        this.workerTask();
      }
    });
  }

  readFile(path: string): Promise<string> {
    return this.enqueueTask(
      () =>
        new Promise((resolve, reject) => {
          const worker = this.workers.pop()!;
          worker.postMessage({ path, method: "readFile", resolve, reject });
          this.workers.unshift(worker);
        })
    );
  }

  writeFile(path: string, content: string): Promise<void> {
    return this.enqueueTask(
      () =>
        new Promise((resolve, reject) => {
          const worker = this.workers.pop()!;
          worker.postMessage({
            path,
            content,
            method: "writeFile",
            resolve,
            reject,
          });
          this.workers.unshift(worker);
        })
    );
  }

  fileExists(path: string): Promise<boolean> {
    return this.enqueueTask(
      () =>
        new Promise((resolve, reject) => {
          const worker = this.workers.pop()!;
          worker.postMessage({ path, method: "fileExists", resolve, reject });
          this.workers.unshift(worker);
        })
    );
  }
}
