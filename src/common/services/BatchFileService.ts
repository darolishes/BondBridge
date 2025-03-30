export interface BatchFileService {
  readFiles(filePaths: string[]): Promise<{ [key: string]: string }>;
}
