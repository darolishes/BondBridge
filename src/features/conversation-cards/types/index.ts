/**
 * Definition einer Konversationskarte
 */
export interface Card {
  id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  created: Date;
}

/**
 * Props für die Card-Komponente
 */
export interface CardProps {
  card: Card;
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
