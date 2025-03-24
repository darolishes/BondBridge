export interface ImportResult {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
  data?: {
    id: string;
    name: string;
    importedAt: string;
  };
}

export interface ImportError {
  code: string;
  message: string;
}
