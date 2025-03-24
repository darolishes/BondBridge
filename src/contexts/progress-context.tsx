import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import type { Progress, ProgressSummary } from '@types';
import { ProgressTracker } from '@services/progress/progress-tracker';
import { AsyncStorageProgressRepository } from '@services/progress/progress-storage';

interface ProgressContextType {
  trackCardView: (setId: string, cardId: string) => Promise<Progress>;
  getSetProgress: (setId: string, totalCards: number) => Promise<ProgressSummary>;
  resetProgress: (setId: string) => Promise<void>;
  getAllProgress: (
    cardSetSizes: Record<string, number>
  ) => Promise<Record<string, ProgressSummary>>;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const progressTracker = new ProgressTracker(new AsyncStorageProgressRepository());

interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const trackCardView = useCallback(async (setId: string, cardId: string) => {
    return progressTracker.trackCardView(setId, cardId);
  }, []);

  const getSetProgress = useCallback(async (setId: string, totalCards: number) => {
    return progressTracker.getSetProgress(setId, totalCards);
  }, []);

  const resetProgress = useCallback(async (setId: string) => {
    return progressTracker.resetProgress(setId);
  }, []);

  const getAllProgress = useCallback(async (cardSetSizes: Record<string, number>) => {
    return progressTracker.getAllProgress(cardSetSizes);
  }, []);

  const value = {
    trackCardView,
    getSetProgress,
    resetProgress,
    getAllProgress,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgressContext must be used within a ProgressProvider');
  }
  return context;
}
