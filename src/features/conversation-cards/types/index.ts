import type { Card } from "@common/types/card";

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
  /** Die Karteninformationen */
  card: Card;
  isActive?: boolean;
  onSwipe?: (direction: "left" | "right") => void;
}

/**
 * Upload-spezifische Kartenstruktur
 */
export interface UploadCard extends Omit<Card, "created" | "lastModified"> {
  /** Optional descriptions or hints */
  hints?: string[];
}

/**
 * Upload-spezifische Kartenset-Metadaten
 */
export interface UploadCardSetMeta {
  /** Name des Kartensets */
  name: string;
  /** Beschreibung des Kartensets */
  description: string;
  /** Version des Kartenset-Formats */
  version?: string;
  /** Quelle des Kartensets */
  source?: string;
}

/**
 * Vollständiges Upload-Kartenset
 */
export interface UploadCardSet extends UploadCardSetMeta {
  /** Karten im Set */
  cards: UploadCard[];
}
