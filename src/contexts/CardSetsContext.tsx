import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ImportedCardSet, ImportResult } from '../types/cardSet';
import { listImportedSets, importCardSet } from '@services/import-service';

interface CardSetsContextType {
  importedSets: ImportedCardSet[];
  isLoading: boolean;
  error: string | null;
  importSet: () => Promise<ImportResult>;
  refreshSets: () => Promise<void>;
}

const CardSetsContext = createContext<CardSetsContextType | undefined>(undefined);

export const CardSetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [importedSets, setImportedSets] = useState<ImportedCardSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const sets = await listImportedSets();
      setImportedSets(sets);
    } catch (err) {
      setError('Failed to load card sets');
      console.error('Failed to load card sets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSets();
  }, []);

  const importSet = async (): Promise<ImportResult> => {
    const result = await importCardSet();
    if (result.success && result.data) {
      setImportedSets(prev => [...prev, result.data as ImportedCardSet]);
    }
    return result;
  };

  const refreshSets = async () => {
    await loadSets();
  };

  return (
    <CardSetsContext.Provider
      value={{
        importedSets,
        isLoading,
        error,
        importSet,
        refreshSets,
      }}
    >
      {children}
    </CardSetsContext.Provider>
  );
};

export const useCardSets = () => {
  const context = useContext(CardSetsContext);
  if (context === undefined) {
    throw new Error('useCardSets must be used within a CardSetsProvider');
  }
  return context;
};
