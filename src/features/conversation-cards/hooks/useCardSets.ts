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
    (cardSet: any) => {
      dispatch(addCardSet(cardSet));
    },
    [dispatch]
  );

  const handleRemoveCardSet = useCallback(
    (cardSetId: string) => {
      dispatch(removeCardSet(cardSetId));
    },
    [dispatch]
  );

  const handleSetActiveCardSet = useCallback(
    (cardSetId: string | null) => {
      dispatch(setActiveCardSet(cardSetId));
    },
    [dispatch]
  );

  const handleLoadCardSets = useCallback(() => {
    dispatch(fetchCardSets());
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
