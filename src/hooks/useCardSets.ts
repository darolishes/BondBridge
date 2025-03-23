import { useState, useCallback, useEffect } from 'react';
import { CardSetData, CardSetProgress } from '../types/cardSet';
import { Category } from '../types/navigation';
import { getCardSets, getUserProgress, storeCardSets, storeUserProgress } from '../utils/storage';

// Default progress for new card sets
const defaultProgress: Record<Category, number> = {
  Icebreakers: 0,
  Confessions: 0,
  Personality: 0,
  'Deep Thoughts': 0,
  Intimacy: 0,
  Growth: 0,
};

// Initial mock data for development
const mockCardSets: CardSetData[] = [
  {
    id: 'set-1',
    name: 'Romantic Evening',
    description: 'Light-hearted questions for date night',
    totalCards: 20,
    categories: ['Icebreakers', 'Intimacy'],
  },
  {
    id: 'set-2',
    name: 'Deep Connection',
    description: 'Thought-provoking questions for deeper bonds',
    totalCards: 30,
    categories: ['Deep Thoughts', 'Growth'],
  },
];

const useCardSets = () => {
  const [cardSets, setCardSets] = useState<CardSetData[]>([]);
  const [progress, setProgress] = useState<Record<string, CardSetProgress>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadCardSets();
  }, []);

  const loadCardSets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [storedCardSets, storedProgress] = await Promise.all([
        getCardSets(),
        getUserProgress(),
      ]);

      // If no stored card sets, use mock data for development
      if (storedCardSets.length === 0) {
        await storeCardSets(mockCardSets);
        setCardSets(mockCardSets);
      } else {
        setCardSets(storedCardSets);
      }

      // Initialize progress for card sets
      const initialProgress: Record<string, CardSetProgress> = {};
      (storedCardSets.length ? storedCardSets : mockCardSets).forEach(set => {
        initialProgress[set.id] = {
          totalSeen: storedProgress[set.id] || 0,
          totalCards: set.totalCards,
          seenByCategory: { ...defaultProgress },
        };
      });

      setProgress(initialProgress);
      await storeUserProgress(storedProgress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load card sets');
      console.error('Error loading card sets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCardSets = useCallback(async () => {
    await loadCardSets();
  }, []);

  const updateProgress = useCallback(
    async (cardSetId: string, newProgress: CardSetProgress) => {
      setProgress(prev => ({
        ...prev,
        [cardSetId]: newProgress,
      }));

      try {
        await storeUserProgress({
          ...Object.keys(progress).reduce(
            (acc, id) => ({
              ...acc,
              [id]: progress[id].totalSeen,
            }),
            {}
          ),
          [cardSetId]: newProgress.totalSeen,
        });
      } catch (err) {
        console.error('Error updating progress:', err);
        // Revert on error
        setProgress(prev => ({
          ...prev,
          [cardSetId]: progress[cardSetId],
        }));
        throw err;
      }
    },
    [progress]
  );

  return {
    cardSets,
    progress,
    isLoading,
    error,
    refreshCardSets,
    updateProgress,
  };
};

export default useCardSets;
