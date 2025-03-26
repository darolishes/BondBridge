/**
 * Complete Redux state type
 */
export interface RootState {
  cards: {
    allCards: Record<string, any>;
    activeCardId: string | null;
    cardOrder: string[];
    filteredCardIds: string[];
    cardSets: any[];
    activeCardSetId: string | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  filters: {
    categories: {
      selected: string[];
      available: string[];
    };
    difficulty: {
      min: number;
      max: number;
    };
    searchTerm: string;
    cardStatus: string;
    activeCardSetId: string | null;
  };
  settings: {
    themePreference: string;
    cardTransitionSpeed: "slow" | "medium" | "fast";
    hapticFeedback: boolean;
    showDifficulty: boolean;
    showFollowUp: boolean;
    autoPlayCards: boolean;
    autoPlayInterval: number;
  };
}

/**
 * Redux dispatch function type
 */
export type AppDispatch = any;

/**
 * Type for the store after persist
 */
export interface PersistedRootState extends RootState {
  _persist: {
    version: number;
    rehydrated: boolean;
  };
}
