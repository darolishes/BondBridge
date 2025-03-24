import { useState, useCallback, useEffect } from 'react';
import { CardSetData } from '@types';
import { DEFAULT_CARD_SET_IMAGE } from '@constants';

// Mock-Daten für die Entwicklung
const mockCardSets: CardSetData[] = [
  {
    id: 'set-1',
    name: 'Erste Schritte',
    description: 'Perfekt für den Beziehungsstart',
    totalCards: 20,
    categories: ['Icebreakers', 'Personality'],
    image: DEFAULT_CARD_SET_IMAGE,
  },
  {
    id: 'set-2',
    name: 'Tiefere Verbindung',
    description: 'Für bedeutungsvolle Gespräche',
    totalCards: 30,
    categories: ['Deep Thoughts', 'Growth'],
    image: DEFAULT_CARD_SET_IMAGE,
  },
  {
    id: 'set-3',
    name: 'Romantischer Abend',
    description: 'Für besondere Momente zu zweit',
    totalCards: 25,
    categories: ['Intimacy', 'Confessions'],
    image: DEFAULT_CARD_SET_IMAGE,
  },
  {
    id: 'set-4',
    name: 'Wachstum & Entwicklung',
    description: 'Gemeinsam wachsen und lernen',
    totalCards: 35,
    categories: ['Growth', 'Deep Thoughts'],
    image: DEFAULT_CARD_SET_IMAGE,
  },
];

interface UseCardSetsReturn {
  cardSets: CardSetData[];
  isLoading: boolean;
  refreshing: boolean;
  error: string | null;
  handleRefresh: () => Promise<void>;
  handleImport: () => void;
  seenByCategory: Record<string, number>;
}

const defaultSeenByCategory = {
  Icebreakers: 5,
  Confessions: 3,
  Personality: 7,
  'Deep Thoughts': 4,
  Intimacy: 2,
  Growth: 6,
};

export const useCardSets = (): UseCardSetsReturn => {
  const [cardSets, setCardSets] = useState<CardSetData[]>(mockCardSets);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seenByCategory, setSeenByCategory] =
    useState<Record<string, number>>(defaultSeenByCategory);

  // Initiale Datenladelogik
  const loadCardSets = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCardSets(mockCardSets);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Kartensets');
      console.error('Fehler beim Laden der Kartensets:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadCardSets();
    } finally {
      setRefreshing(false);
    }
  }, [loadCardSets]);

  const handleImport = useCallback(() => {
    // TODO: Implementiere Import-Logik
    console.log('Import-Funktionalität wird implementiert...');
  }, []);

  return {
    cardSets,
    isLoading,
    refreshing,
    error,
    handleRefresh,
    handleImport,
    seenByCategory,
  };
};

export default useCardSets;
