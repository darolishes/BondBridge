import { useCallback, useEffect, useState, useMemo } from 'react';
import type {
  ProgressSummary,
  ProgressError,
  ProgressLoadingState,
  UseProgressReturn,
} from '@types';
import { useProgressContext } from '@contexts/progress-context';
import { createProgressError } from '@utils/error-utils';

/**
 * Hook for tracking and managing card set progress
 * @param setId The ID of the card set
 * @param totalCards Total number of cards in the set
 */
export function useProgress(setId: string, totalCards: number): UseProgressReturn {
  const progress = useProgressContext();
  const [progressData, setProgressData] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState<ProgressLoadingState>({ isLoading: true });
  const [error, setError] = useState<ProgressError | null>(null);

  // Load initial progress
  useEffect(() => {
    let mounted = true;

    const loadProgress = async () => {
      try {
        setLoading({ isLoading: true, operation: 'load' });
        const data = await progress.getSetProgress(setId, totalCards);
        if (mounted) {
          setProgressData(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(createProgressError('STORAGE_ERROR', 'Failed to load progress', err));
        }
      } finally {
        if (mounted) {
          setLoading({ isLoading: false });
        }
      }
    };

    loadProgress();
    return () => {
      mounted = false;
    };
  }, [progress, setId, totalCards]);

  // Track a card view
  const trackCardView = useCallback(
    async (cardId: string) => {
      try {
        setLoading({ isLoading: true, operation: 'track' });
        const data = await progress.trackCardView(setId, cardId);
        // Refresh progress summary after tracking
        const summary = await progress.getSetProgress(setId, totalCards);
        setProgressData(summary);
        setError(null);
        return data;
      } catch (err) {
        const error = createProgressError('STORAGE_ERROR', 'Failed to track card view', err);
        setError(error);
        throw error;
      } finally {
        setLoading({ isLoading: false });
      }
    },
    [progress, setId, totalCards]
  );

  // Reset progress
  const resetProgress = useCallback(async () => {
    try {
      setLoading({ isLoading: true, operation: 'reset' });
      await progress.resetProgress(setId);
      setProgressData({
        seenCards: [],
        completedAt: null,
        lastViewedAt: null,
        percentage: 0,
      });
      setError(null);
    } catch (err) {
      const error = createProgressError('STORAGE_ERROR', 'Failed to reset progress', err);
      setError(error);
      throw error;
    } finally {
      setLoading({ isLoading: false });
    }
  }, [progress, setId]);

  return useMemo(
    () => ({
      progress: progressData,
      loading,
      error,
      trackCardView,
      resetProgress,
    }),
    [progressData, loading, error, trackCardView, resetProgress]
  );
}
