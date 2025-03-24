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

export * from './navigation';
export * from './cardSet';
export * from './theme';
export * from './progress';
