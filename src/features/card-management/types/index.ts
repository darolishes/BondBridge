import { BaseEntity } from "@common/types";

/**
 * Card Management Types
 */

/**
 * Eigenschaften für die Karten-Komponenten
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

/**
 * Schwierigkeitsgrad der Karte
 */
export type CardDifficulty = "easy" | "medium" | "hard";

/**
 * Status des Lernfortschritts für eine Karte
 */
export type CardStatus = "new" | "learning" | "review" | "mastered";

/**
 * Datenmodell für eine Karte, erweitert mit ID und Meta-Daten
 */
export interface CardData extends BaseEntity {
  /** Die Frage oder der Inhalt der Karte */
  question: string;
  /** Die Antwort auf die Frage */
  answer: string;
  /** Hinweise zur Frage (optional) */
  hint?: string;
  /** Die Kategorie der Karte */
  category: string;
  /** Tags zur Karte für bessere Filterung */
  tags: string[];
  /** Der Schwierigkeitsgrad der Karte */
  difficulty: CardDifficulty;
  /** Aktuelle Lernstatus der Karte */
  status: CardStatus;
  /** Optionale Folgefrage */
  followUp?: string;
  /** Nummer der Wiederholungen */
  repetitions: number;
  /** Zeitpunkt, wann die Karte das nächste Mal wiederholt werden sollte */
  nextReviewAt?: string;
  /** Optionale Multimedia-Inhalte */
  media?: {
    type: "image" | "audio" | "video";
    url: string;
  }[];
}

/**
 * Sammlung/Deck von Karten
 */
export interface CardDeck extends BaseEntity {
  /** Name des Decks */
  name: string;
  /** Beschreibung des Decks */
  description?: string;
  /** Kategorien im Deck */
  categories: string[];
  /** Anzahl der Karten im Deck */
  cardCount: number;
  /** Aktiver Status des Decks */
  isActive: boolean;
  /** Besitzer-ID des Decks */
  ownerId: string;
  /** Flag, ob das Deck geteilt werden kann */
  isShareable: boolean;
  /** Teilen-Code, falls das Deck geteilt werden kann */
  shareCode?: string;
}

/**
 * Lernstatistik für eine Karte
 */
export interface CardStats {
  /** ID der Karte */
  cardId: string;
  /** Anzahl korrekter Antworten */
  correctAnswers: number;
  /** Anzahl falscher Antworten */
  incorrectAnswers: number;
  /** Anzahl der Ansichten */
  views: number;
  /** Durchschnittliche Antwortzeit in Sekunden */
  avgAnswerTime: number;
  /** Letzter Lernzeitpunkt */
  lastStudiedAt: string;
  /** Aktueller Schwierigkeitsfaktor (für SRS) */
  easeFactor: number;
  /** Intervall bis zur nächsten Wiederholung (in Tagen) */
  interval: number;
}

/**
 * Parameter für die Kartenfilterung
 */
export interface CardFilterParams {
  /** Nach Kategorien filtern */
  categories?: string[];
  /** Nach Tags filtern */
  tags?: string[];
  /** Nach Schwierigkeitsgrad filtern */
  difficulty?: CardDifficulty[];
  /** Nach Status filtern */
  status?: CardStatus[];
  /** Nach Text suchen (in Frage oder Antwort) */
  searchText?: string;
  /** Nach Deck filtern */
  deckId?: string;
  /** Nur fällige Karten anzeigen */
  dueOnly?: boolean;
}

/**
 * Eigenschaften für den CategorySelector
 */
export interface CategorySelectorProps {
  /** Liste der Kategorien */
  categories: string[];
  /** Aktuell ausgewählte Kategorie */
  selectedCategory: string | null;
  /** Callback für Kategorieänderungen */
  onSelectCategory: (category: string) => void;
}

/**
 * Eigenschaften für den ProgressIndicator
 */
export interface ProgressIndicatorProps {
  /** Prozentsatz des Fortschritts (0-100) */
  progress: number;
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
