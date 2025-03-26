/**
 * Card Management Types
 */

export interface CardItemProps {
  /** Die Frage oder der Inhalt der Karte */
  question: string;
  /** Die Kategorie der Karte */
  category: string;
  /** Der Schwierigkeitsgrad der Karte (easy, medium, hard) */
  difficulty: string;
  /** Optionale Folgefrage */
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

/**
 * Weitere Typen für das Karten-Management
 */
export interface CardCollection {
  id: string;
  name: string;
  description?: string;
  cards: CardItemProps[];
  createdAt: Date;
  updatedAt: Date;
}
