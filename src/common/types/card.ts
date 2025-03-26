/**
 * Represents a conversation card
 */
export interface Card {
  /** Unique identifier */
  id: string;
  /** Main question text */
  question: string;
  /** Category of the card */
  category: string;
  /** Difficulty level (1-5) */
  difficulty: number;
  /** Follow-up questions */
  followUps?: string[];
}

/**
 * Metadata for a card set
 */
export interface CardSetMeta {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Description of the set */
  description: string;
  /** Creation/import date */
  createdAt: string;
}

/**
 * Complete card set with metadata and cards
 */
export interface CardSet extends CardSetMeta {
  /** Cards in the set */
  cards: Card[];
}

/**
 * Possible swipe actions
 */
export type SwipeAction = {
  /** Card identifier */
  cardId: string;
  /** Direction swiped */
  direction: "left" | "right";
  /** Timestamp of action */
  timestamp: string;
};

/**
 * Card status types
 */
export type CardStatus = "unseen" | "swiped" | "reported";
