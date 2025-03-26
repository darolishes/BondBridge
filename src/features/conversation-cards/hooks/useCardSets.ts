import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  selectCardSets,
  selectActiveCardSet,
  addCardSet,
  removeCardSet,
  setActiveCardSet,
  fetchCardSets,
} from "@store/slices/cardsSlice";
import { CardSet } from "../types";

/**
 * Custom hook for managing card sets
 * Provides access to card set state and actions
 */
export const useCardSets = () => {
  const dispatch = useAppDispatch();
  const cardSets = useAppSelector(selectCardSets);
  const activeCardSet = useAppSelector(selectActiveCardSet);

  // Action handlers
  const handleAddCardSet = useCallback(
    async (cardSet: any): Promise<boolean> => {
      try {
        dispatch(addCardSet(cardSet));
        return true;
      } catch (error) {
        console.error("Error adding card set:", error);
        return false;
      }
    },
    [dispatch]
  );

  const handleRemoveCardSet = useCallback(
    async (cardSetId: string): Promise<boolean> => {
      try {
        dispatch(removeCardSet(cardSetId));
        return true;
      } catch (error) {
        console.error("Error removing card set:", error);
        return false;
      }
    },
    [dispatch]
  );

  const handleSetActiveCardSet = useCallback(
    (cardSetId: string | null) => {
      dispatch(setActiveCardSet(cardSetId));
    },
    [dispatch]
  );

  const handleLoadCardSets = useCallback(async (): Promise<boolean> => {
    try {
      dispatch(fetchCardSets());
      return true;
    } catch (error) {
      console.error("Error loading card sets:", error);
      return false;
    }
  }, [dispatch]);

  // Utility functions
  const getCardSetById = useCallback(
    (id: string) => {
      return cardSets.find((set: CardSet) => set.id === id) || null;
    },
    [cardSets]
  );

  return {
    // State
    cardSets,
    activeCardSet,

    // Actions
    addCardSet: handleAddCardSet,
    removeCardSet: handleRemoveCardSet,
    setActiveCardSet: handleSetActiveCardSet,
    loadCardSets: handleLoadCardSets,

    // Utilities
    getCardSetById,
  };
};

export default useCardSets;
