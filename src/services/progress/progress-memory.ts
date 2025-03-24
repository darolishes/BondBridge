import type { Progress, ProgressRepository, ProgressError } from '@types';

/**
 * In-memory implementation of ProgressRepository
 * Suitable for testing and development
 * Production should use AsyncStorageProgressRepository
 */
export class InMemoryProgressRepository implements ProgressRepository {
  private progressMap = new Map<string, Progress>();

  /**
   * Gets progress data for a card set
   * @param id Card set ID
   */
  async getProgress(id: string): Promise<Progress | null> {
    return this.progressMap.get(id) || null;
  }

  /**
   * Saves progress data for a card set
   * @param id Card set ID
   * @param progress Progress data to save
   */
  async saveProgress(id: string, progress: Progress): Promise<void> {
    if (!this.isValidProgress(id, progress)) {
      throw this.createError('INVALID_DATA', 'Invalid progress data');
    }
    this.progressMap.set(id, progress);
  }

  /**
   * Resets progress for a card set
   * @param id Card set ID
   */
  async resetProgress(id: string): Promise<void> {
    this.progressMap.delete(id);
  }

  /**
   * Gets all saved progress data
   */
  async getAllProgress(): Promise<Record<string, Progress>> {
    return Object.fromEntries(this.progressMap.entries());
  }

  /**
   * Validates progress data structure
   */
  private isValidProgress(id: string, progress: Progress): boolean {
    return (
      Array.isArray(progress.seenCards) &&
      (progress.completedAt === null || typeof progress.completedAt === 'string') &&
      (progress.lastViewedAt === null || typeof progress.lastViewedAt === 'string')
    );
  }

  /**
   * Creates a standardized error object
   */
  private createError(code: ProgressError['code'], message: string): ProgressError {
    return { code, message };
  }
}
