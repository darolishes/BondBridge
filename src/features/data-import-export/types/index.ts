import { CardData, CardDeck } from "@features/card-management/types";
import { BaseEntity } from "@common/types";

/**
 * Data Import/Export Types
 */

/**
 * Import/Export-Format für Karten-Daten
 */
export interface CardExportFormat {
  /** Format-Version */
  version: string;
  /** Zeitstempel des Exports */
  exportedAt: string;
  /** Metadaten des Exports */
  meta: {
    /** Ersteller des Exports */
    creator?: string;
    /** App-Version, die den Export erzeugt hat */
    appVersion?: string;
    /** Zusätzliche benutzerdefinierte Metadaten */
    [key: string]: any;
  };
  /** Exportierte Decks */
  decks: CardDeck[];
  /** Exportierte Karten */
  cards: CardData[];
}

/**
 * Import-Optionen für den Import-Prozess
 */
export interface ImportOptions {
  /** Vorhandene Daten überschreiben */
  overwriteExisting: boolean;
  /** Kategorien beim Import beibehalten */
  preserveCategories: boolean;
  /** Lernfortschritt zurücksetzen */
  resetProgress: boolean;
  /** Daten validieren vor dem Import */
  validateBeforeImport: boolean;
}

/**
 * Export-Optionen für den Export-Prozess
 */
export interface ExportOptions {
  /** IDs der zu exportierenden Decks */
  deckIds?: string[];
  /** Format des Exports */
  format: "json" | "csv" | "pdf";
  /** Zusätzliche Metadaten */
  includeMetadata: boolean;
  /** Lernstatistik mit exportieren */
  includeStats: boolean;
}

/**
 * Speicherorte für Import/Export
 */
export type StorageLocation =
  | "device" // Lokaler Speicher
  | "cloud" // Cloud-Speicher
  | "share"; // Teilen-Option

/**
 * Ergebnis eines Import-Vorgangs
 */
export interface ImportResult {
  /** Erfolg oder Fehlschlag */
  success: boolean;
  /** Anzahl importierter Karten */
  cardsImported: number;
  /** Anzahl importierter Decks */
  decksImported: number;
  /** Fehler, falls vorhanden */
  error?: string;
  /** Warnungen */
  warnings: string[];
  /** Details zu importierten Elementen */
  details?: {
    /** IDs der neuen Karten */
    newCardIds: string[];
    /** IDs der aktualisierten Karten */
    updatedCardIds: string[];
    /** IDs der neuen Decks */
    newDeckIds: string[];
    /** IDs der aktualisierten Decks */
    updatedDeckIds: string[];
  };
}

/**
 * Import/Export-Protokolleintrag
 */
export interface ImportExportLogEntry extends BaseEntity {
  /** Typ des Vorgangs */
  type: "import" | "export";
  /** Zeitpunkt des Vorgangs */
  timestamp: string;
  /** Anzahl der betroffenen Karten */
  cardCount: number;
  /** Anzahl der betroffenen Decks */
  deckCount: number;
  /** Benutzerdefinierte Dateinamen */
  filename?: string;
  /** War der Vorgang erfolgreich */
  success: boolean;
  /** Fehlermeldung, falls vorhanden */
  error?: string;
}
