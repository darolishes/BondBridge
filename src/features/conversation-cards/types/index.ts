/**
 * Definition einer Konversationskarte
 */
export interface Card {
  id: string;
  question: string;
  category: CardCategory;
  difficulty: number; // 1-5
  followUpQuestions?: string[];
  created: Date;
}

/**
 * Card categories
 */
export type CardCategory =
  | "icebreakers"
  | "confessions"
  | "personality"
  | "deepThoughts"
  | "intimacy"
  | "growth";

/**
 * Props für die Card-Komponente
 */
export interface CardProps {
  card: Card;
  isActive?: boolean;
  onSwipe?: (direction: "left" | "right") => void;
}

/**
 * Definition eines Kartensets
 */
export interface CardSet {
  id: string;
  name: string;
  description: string;
  cards: Card[];
  version: string;
  author: string;
  created: Date;
  modified: Date;
}
