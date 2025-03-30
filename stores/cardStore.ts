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

interface CardStore {
  cards: Card[];
  currentCardIndex: number;
  currentCard: Card | null;
  totalCards: number;
  loadCards: () => Promise<void>;
  nextCard: () => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'bondbridge_progress';

const mockCards: Card[] = [
  {
    id: '1',
    question: 'What\'s your favorite memory of us together?',
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
    question: 'What\'s one dream you\'d like to achieve together?',
    category: 'dreams',
  },
  {
    id: '4',
    question: 'What values are most important to you in our relationship?',
    category: 'values',
  },
  {
    id: '5',
    question: 'What\'s been the biggest challenge we\'ve overcome together?',
    category: 'challenges',
  },
  {
    id: '6',
    question: 'How have you grown since we\'ve been together?',
    category: 'growth',
  },
  {
    id: '7',
    question: 'What's a new tradition you'd like to start together?',
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

  loadCards: async () => {
    try {
      const savedProgress = await AsyncStorage.getItem(STORAGE_KEY);
      const startIndex = savedProgress ? parseInt(savedProgress, 10) : 0;

      set({
        cards: mockCards,
        currentCardIndex: startIndex,
        currentCard: mockCards[startIndex] || null,
        totalCards: mockCards.length,
      });
    } catch (error) {
      console.error('Error loading cards:', error);
    }
  },

  nextCard: () => {
    const { currentCardIndex, cards } = get();
    const nextIndex = currentCardIndex + 1;
    
    AsyncStorage.setItem(STORAGE_KEY, nextIndex.toString());

    set({
      currentCardIndex: nextIndex,
      currentCard: cards[nextIndex] || null,
    });
  },

  resetProgress: () => {
    AsyncStorage.setItem(STORAGE_KEY, '0');
    set({
      currentCardIndex: 0,
      currentCard: get().cards[0] || null,
    });
  },
}));