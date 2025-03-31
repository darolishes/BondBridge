import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

const CardSchema = z.object({
  id: z.string(),
  question: z.string(),
  subQuestion: z.string().optional(),
  category: z.string(),
});

type Card = z.infer<typeof CardSchema>;

interface CardHistory {
  card: Card;
  direction: 'left' | 'right';
  timestamp: number;
}

interface CardStore {
  cards: Card[];
  currentCardIndex: number;
  currentCard: Card | null;
  totalCards: number;
  cardHistory: CardHistory[];
  canUndo: boolean;
  loadCards: () => Promise<void>;
  nextCard: (direction: 'left' | 'right') => void;
  undoLastCard: () => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'bondbridge_progress';
const HISTORY_KEY = 'bondbridge_history';

const mockCards: Card[] = [
  {
    id: '1',
    question: "What's your favorite memory of us together?",
    category: 'memories',
  },
  {
    id: '2',
    question: 'What makes you feel most loved?',
    subQuestion: 'Think about specific actions or words.',
    category: 'emotions',
  },
  {
    id: '3',
    question: "What's one dream you'd like to achieve together?",
    category: 'dreams',
  },
  {
    id: '4',
    question: 'What values are most important to you in our relationship?',
    category: 'values',
  },
  {
    id: '5',
    question: "What's been the biggest challenge we've overcome together?",
    category: 'challenges',
  },
  {
    id: '6',
    question: "How have you grown since we've been together?",
    category: 'growth',
  },
  {
    id: '7',
    question: "What's a new tradition you'd like to start together?",
    category: 'dreams',
  },
  {
    id: '8',
    question: 'When do you feel most connected to me?',
    subQuestion: 'Consider both big moments and small daily interactions.',
    category: 'emotions',
  },
];

export const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  currentCardIndex: 0,
  currentCard: null,
  totalCards: 0,
  cardHistory: [],
  canUndo: false,

  loadCards: async () => {
    try {
      const [savedProgress, savedHistory] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(HISTORY_KEY),
      ]);

      const startIndex = savedProgress ? parseInt(savedProgress, 10) : 0;
      const history = savedHistory
        ? (JSON.parse(savedHistory) as CardHistory[])
        : [];

      set({
        cards: mockCards,
        currentCardIndex: startIndex,
        currentCard: mockCards[startIndex] || null,
        totalCards: mockCards.length,
        cardHistory: history,
        canUndo: history.length > 0,
      });
    } catch (error) {
      console.error('Error loading cards:', error);
    }
  },

  nextCard: (direction: 'left' | 'right') => {
    const { currentCardIndex, cards, currentCard, cardHistory } = get();
    if (!currentCard) return;

    const nextIndex = currentCardIndex + 1;
    const newHistory = [
      ...cardHistory,
      {
        card: currentCard,
        direction,
        timestamp: Date.now(),
      },
    ];

    Promise.all([
      AsyncStorage.setItem(STORAGE_KEY, nextIndex.toString()),
      AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory)),
    ]);

    set({
      currentCardIndex: nextIndex,
      currentCard: cards[nextIndex] || null,
      cardHistory: newHistory,
      canUndo: true,
    });
  },

  undoLastCard: () => {
    const { cardHistory, currentCardIndex, cards } = get();
    if (cardHistory.length === 0 || currentCardIndex === 0) return;

    const newHistory = cardHistory.slice(0, -1);
    const prevIndex = currentCardIndex - 1;

    Promise.all([
      AsyncStorage.setItem(STORAGE_KEY, prevIndex.toString()),
      AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory)),
    ]);

    set({
      currentCardIndex: prevIndex,
      currentCard: cards[prevIndex],
      cardHistory: newHistory,
      canUndo: newHistory.length > 0,
    });
  },

  resetProgress: () => {
    Promise.all([
      AsyncStorage.setItem(STORAGE_KEY, '0'),
      AsyncStorage.setItem(HISTORY_KEY, '[]'),
    ]);

    set({
      currentCardIndex: 0,
      currentCard: get().cards[0] || null,
      cardHistory: [],
      canUndo: false,
    });
  },
}));
