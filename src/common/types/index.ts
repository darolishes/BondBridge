/**
 * Common Types across the application
 */

export type ThemeType = "light" | "dark" | "system";

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
