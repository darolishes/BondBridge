import { FileService } from "./FileService";

/**
 * CachedFileService Implementation
 * Implements FileService with caching
 */
export class CachedFileService implements FileService {
  private cache: Map<string, string> = new Map();

  constructor(private fileService: FileService) {}

  async readFile(path: string): Promise<string> {
    if (this.cache.has(path)) {
      return this.cache.get(path)!;
    }

    const content = await this.fileService.readFile(path);
    this.cache.set(path, content);
    return content;
  }

  async writeFile(path: string, content: string): Promise<void> {
    await this.fileService.writeFile(path, content);
    this.cache.set(path, content);
  }

  async fileExists(path: string): Promise<boolean> {
    if (this.cache.has(path)) {
      return true;
    }
    return this.fileService.fileExists(path);
  }
}
