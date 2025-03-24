import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Progress, ProgressRepository, ProgressError } from '@types';

const PROGRESS_KEY_PREFIX = '@bondbridge/progress/';

/**
 * AsyncStorage implementation of ProgressRepository
 * Persists progress data using React Native's AsyncStorage
 */
export class AsyncStorageProgressRepository implements ProgressRepository {
  /**
   * Gets progress data for a card set
   * @param setId Card set ID
   */
  async getProgress(setId: string): Promise<Progress | null> {
    try {
      const key = this.getStorageKey(setId);
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw this.createError('STORAGE_ERROR', 'Failed to retrieve progress data', error);
    }
  }

  /**
   * Saves progress data for a card set
   * @param setId Card set ID
   * @param progress Progress data to save
   */
  async saveProgress(setId: string, progress: Progress): Promise<void> {
    try {
      if (!this.isValidProgress(setId, progress)) {
        throw this.createError('INVALID_DATA', 'Invalid progress data');
      }

      const key = this.getStorageKey(setId);
      await AsyncStorage.setItem(key, JSON.stringify(progress));
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        throw error as ProgressError;
      }
      throw this.createError('STORAGE_ERROR', 'Failed to save progress data', error);
    }
  }

  /**
   * Resets progress for a card set
   * @param setId Card set ID
   */
  async resetProgress(setId: string): Promise<void> {
    try {
      const key = this.getStorageKey(setId);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw this.createError('STORAGE_ERROR', 'Failed to reset progress data', error);
    }
  }

  /**
   * Gets all saved progress data
   */
  async getAllProgress(): Promise<Record<string, Progress>> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const progressKeys = keys.filter(key => key.startsWith(PROGRESS_KEY_PREFIX));
      const entries = await AsyncStorage.multiGet(progressKeys);

      return entries.reduce<Record<string, Progress>>((acc, [key, value]) => {
        if (value) {
          const setId = this.getSetIdFromKey(key);
          acc[setId] = JSON.parse(value);
        }
        return acc;
      }, {});
    } catch (error) {
      throw this.createError('STORAGE_ERROR', 'Failed to retrieve all progress data', error);
    }
  }

  /**
   * Validates progress data structure
   */
  private isValidProgress(setId: string, progress: Progress): boolean {
    return (
      Array.isArray(progress.seenCards) &&
      (progress.completedAt === null || typeof progress.completedAt === 'string') &&
      (progress.lastViewedAt === null || typeof progress.lastViewedAt === 'string')
    );
  }

  /**
   * Creates a standardized error object
   */
  private createError(
    code: ProgressError['code'],
    message: string,
    details?: unknown
  ): ProgressError {
    return { code, message, details };
  }

  /**
   * Gets the storage key for a set ID
   */
  private getStorageKey(setId: string): string {
    return `${PROGRESS_KEY_PREFIX}${setId}`;
  }

  /**
   * Extracts set ID from a storage key
   */
  private getSetIdFromKey(key: string): string {
    return key.replace(PROGRESS_KEY_PREFIX, '');
  }
}
