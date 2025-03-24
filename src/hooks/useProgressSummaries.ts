import { useState, useEffect, useMemo } from 'react';
import type {
  ProgressSummary,
  ProgressError,
  ProgressLoadingState,
  CardSetInfo,
  UseProgressSummariesReturn,
} from '@types';
import { useProgressContext } from '@contexts/progress-context';
import { createProgressError } from '@utils/error-utils';

/**
 * Hook for managing progress across multiple card sets
 * @param cardSets Array of card set info objects
 */
export function useProgressSummaries(cardSets: CardSetInfo[]): UseProgressSummariesReturn {
  const progress = useProgressContext();
  const [summaries, setSummaries] = useState<Record<string, ProgressSummary>>({});
  const [loading, setLoading] = useState<ProgressLoadingState>({ isLoading: true });
  const [error, setError] = useState<ProgressError | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadSummaries = async () => {
      try {
        setLoading({ isLoading: true, operation: 'loadAll' });
        const cardSetSizes = cardSets.reduce<Record<string, number>>((acc, set) => {
          acc[set.id] = set.totalCards;
          return acc;
        }, {});

        const data = await progress.getAllProgress(cardSetSizes);
        if (mounted) {
          setSummaries(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(createProgressError('STORAGE_ERROR', 'Failed to load progress summaries', err));
        }
      } finally {
        if (mounted) {
          setLoading({ isLoading: false });
        }
      }
    };

    loadSummaries();
    return () => {
      mounted = false;
    };
  }, [progress, cardSets]);

  return useMemo(
    () => ({
      summaries,
      loading,
      error,
    }),
    [summaries, loading, error]
  );
}
