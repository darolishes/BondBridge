import { ImageSourcePropType } from 'react-native';

export interface CardSetData {
  id: string;
  name: string;
  description: string;
  image: string | number | undefined;
  totalCards: number;
  categories: string[];
}

export interface CardSetProgress {
  totalSeen: number;
  totalCards: number;
  seenByCategory: Record<string, number>;
}

export interface Card {
  id: string;
  question: string;
  answer: string;
  category?: string;
  image?: string | number;
}

export interface ImportResult {
  success: boolean;
  data?: CardSetData;
  error?: {
    message: string;
    code?: string;
  };
}

// Re-export specific types to avoid conflicts
export type { ImportError } from './import';
export type { Theme, ThemeMode, ThemeState } from './theme';
export type { CardSet, CardSetTileProps } from './cardSet';
export type { RootStackParamList, RootTabParamList } from './navigation';
export type { Progress, ProgressSummary } from './progress';
