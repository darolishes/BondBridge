/**
 * Card Management Types
 */

export interface CardItemProps {
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  followUp?: string;
}

export interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export interface ProgressIndicatorProps {
  progress: number;
}

export type CardDifficulty = "easy" | "medium" | "hard";

export interface CardData {
  id: string;
  question: string;
  category: string;
  difficulty: CardDifficulty;
  followUp?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CardState {
  cards: CardData[];
  selectedCategory: string | null;
  currentCardIndex: number;
  categories: string[];
  loading: boolean;
  error: string | null;
}
