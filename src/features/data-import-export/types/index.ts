/**
 * Data Import/Export Types
 */

export interface ImportOptions {
  merge: boolean;
  overwrite: boolean;
  categories?: string[];
}

export interface ExportOptions {
  format: "json" | "csv";
  selectedCategories?: string[];
  includeProgress?: boolean;
}

export interface ImportResult {
  success: boolean;
  importedCount: number;
  errors?: string[];
  newCategories?: string[];
}

export interface ImportFileData {
  fileName: string;
  fileSize: number;
  fileType: string;
  content: string;
}

export interface ImportState {
  loading: boolean;
  importing: boolean;
  lastImport: ImportResult | null;
  error: string | null;
  importOptions: ImportOptions;
}
