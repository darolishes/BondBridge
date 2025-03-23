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

export interface CardSetTileProps {
  cardSet: CardSetData;
  progress: CardSetProgress;
  onPress: (setId: string) => void;
  testID?: string;
  isLoading?: boolean;
}

export interface CardSetSkeletonProps {
  numberOfItems?: number;
}
