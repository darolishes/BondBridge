import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardSetData } from '../types/cardSet';

// Storage keys
export const STORAGE_KEYS = {
  CARD_SETS: 'bondbridge:card_sets',
  SEEN_CARDS: 'bondbridge:seen_cards',
  USER_PROGRESS: 'bondbridge:user_progress',
} as const;

// Types
export type SeenCards = Record<string, string[]>; // cardSetId -> cardIds[]
export type UserProgress = Record<string, number>; // cardSetId -> progress

// Storage functions
export const storeCardSets = async (cardSets: CardSetData[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CARD_SETS, JSON.stringify(cardSets));
  } catch (error) {
    console.error('Error storing card sets:', error);
    throw error;
  }
};

export const getCardSets = async (): Promise<CardSetData[]> => {
  try {
    const cardSets = await AsyncStorage.getItem(STORAGE_KEYS.CARD_SETS);
    return cardSets ? JSON.parse(cardSets) : [];
  } catch (error) {
    console.error('Error retrieving card sets:', error);
    throw error;
  }
};

export const storeSeenCards = async (seenCards: SeenCards): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SEEN_CARDS, JSON.stringify(seenCards));
  } catch (error) {
    console.error('Error storing seen cards:', error);
    throw error;
  }
};

export const getSeenCards = async (): Promise<SeenCards> => {
  try {
    const seenCards = await AsyncStorage.getItem(STORAGE_KEYS.SEEN_CARDS);
    return seenCards ? JSON.parse(seenCards) : {};
  } catch (error) {
    console.error('Error retrieving seen cards:', error);
    throw error;
  }
};

export const storeUserProgress = async (progress: UserProgress): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error storing user progress:', error);
    throw error;
  }
};

export const getUserProgress = async (): Promise<UserProgress> => {
  try {
    const progress = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return progress ? JSON.parse(progress) : {};
  } catch (error) {
    console.error('Error retrieving user progress:', error);
    throw error;
  }
};

// Helper functions
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.CARD_SETS,
      STORAGE_KEYS.SEEN_CARDS,
      STORAGE_KEYS.USER_PROGRESS,
    ]);
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

export const migrateStorage = async (version: string): Promise<void> => {
  // TODO: Implement storage migration logic when needed
  // This function will be used to migrate data when storage schema changes
  console.log('Storage migration not implemented yet for version:', version);
};
