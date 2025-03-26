/**
 * Common Types across the application
 */

/**
 * Theme-Typ für die Anwendung
 */
export type ThemeType = "light" | "dark" | "system";

/**
 * Status für asynchrone Operationen
 */
export type AsyncStatus = "idle" | "loading" | "success" | "error";

/**
 * Ein einfacher Typ für gemeinsame Daten-Container-Zustände
 */
export interface AsyncState<T> {
  data: T | null;
  status: AsyncStatus;
  error: string | null;
}

/**
 * Allgemeine Pagination-Information
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
}

/**
 * Allgemeine Sortieroptionen
 */
export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

/**
 * Basisobjekt mit ID und Zeitstempeln
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Basistyp für alle Fehler in der Anwendung
 */
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Basis-Response für alle API-Antworten
 */
export interface ApiResponse<T> {
  data?: T;
  error?: AppError;
  meta?: {
    pagination?: PaginationInfo;
    [key: string]: any;
  };
}

export interface AppSettings {
  theme: ThemeType;
  language: string;
  notifications: boolean;
  hapticFeedback: boolean;
  autoSave: boolean;
}

export interface StorageKeys {
  CARDS: string;
  SETTINGS: string;
  USER_PROGRESS: string;
  CATEGORIES: string;
  LAST_IMPORT: string;
}

export const STORAGE_KEYS: StorageKeys = {
  CARDS: "@BondBridge:cards",
  SETTINGS: "@BondBridge:settings",
  USER_PROGRESS: "@BondBridge:userProgress",
  CATEGORIES: "@BondBridge:categories",
  LAST_IMPORT: "@BondBridge:lastImport",
};

export type AsyncStorageOperation<T> = {
  key: string;
  value?: T;
  callback?: (error?: Error | null, result?: T) => void;
};
