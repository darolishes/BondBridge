/**
 * Represents the progress data for a card set
 */
export interface Progress {
  /** Array of card IDs that have been viewed */
  seenCards: string[];
  /** ISO timestamp when the set was completed (all cards viewed) */
  completedAt: string | null;
  /** ISO timestamp of the last card view */
  lastViewedAt: string | null;
}

/**
 * Extended progress information including completion percentage
 */
export interface ProgressSummary extends Progress {
  /** Percentage of cards viewed (0-100) */
  percentage: number;
}

/**
 * Repository interface for progress data storage
 */
export interface ProgressRepository {
  /**
   * Retrieves progress for a specific card set
   * @param setId The ID of the card set
   * @returns Progress data or null if not found
   */
  getProgress(setId: string): Promise<Progress | null>;

  /**
   * Saves progress for a card set
   * @param setId The ID of the card set
   * @param progress The progress data to save
   */
  saveProgress(setId: string, progress: Progress): Promise<void>;

  /**
   * Resets progress for a card set
   * @param setId The ID of the card set
   */
  resetProgress(setId: string): Promise<void>;

  /**
   * Retrieves progress for all card sets
   * @returns Record of set IDs to their progress
   */
  getAllProgress(): Promise<Record<string, Progress>>;
}

/**
 * Progress error types
 */
export type ProgressErrorCode = 'STORAGE_ERROR' | 'INVALID_DATA' | 'NOT_FOUND' | 'NETWORK_ERROR';

/**
 * Progress error structure
 */
export interface ProgressError {
  code: ProgressErrorCode;
  message: string;
  details?: unknown;
}

/**
 * Card set information
 */
export interface CardSetInfo {
  id: string;
  totalCards: number;
}

/**
 * Loading states for progress operations
 */
export interface ProgressLoadingState {
  isLoading: boolean;
  operation?: 'load' | 'track' | 'reset' | 'loadAll';
}

/**
 * Hook return type for useProgress
 */
export interface UseProgressReturn {
  progress: ProgressSummary | null;
  loading: ProgressLoadingState;
  error: ProgressError | null;
  trackCardView: (cardId: string) => Promise<Progress>;
  resetProgress: () => Promise<void>;
}

/**
 * Hook return type for useProgressSummaries
 */
export interface UseProgressSummariesReturn {
  summaries: Record<string, ProgressSummary>;
  loading: ProgressLoadingState;
  error: ProgressError | null;
}
