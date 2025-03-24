import { ImageSourcePropType } from 'react-native';
import { Category } from './navigation';

export interface CardSetData {
  id: string;
  name: string;
  description: string;
  image?: ImageSourcePropType;
  totalCards: number;
  categories: Category[];
}

export interface CardSetProgress {
  totalSeen: number;
  totalCards: number;
  seenByCategory: Record<Category, number>;
}

export type CardSetTileProps = {
  cardSet: CardSetData;
  progress: CardSetProgress;
  /** Callback when the card set is pressed */
  onPress: (_: string) => void;
  testID?: string;
  isLoading?: boolean;
};

export interface CardSetSkeletonProps {
  numberOfItems?: number;
}

export interface Card {
  id: string;
  category: string;
  question: string;
  followUps: string[];
  difficulty: 1 | 2 | 3;
}

export interface CardSet {
  packageName: string;
  description: string;
  image: string;
  cards: Card[];
}

export interface ImportedCardSet extends CardSet {
  importedAt: string;
  path: string;
}

export type ImportError = {
  code: 'INVALID_JSON' | 'INVALID_SCHEMA' | 'FILE_ERROR' | 'DUPLICATE_PACKAGE';
  message: string;
  details?: unknown;
};

export type ImportResult = {
  success: boolean;
  data?: ImportedCardSet;
  error?: ImportError;
};
