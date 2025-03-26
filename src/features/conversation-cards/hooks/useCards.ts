import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  selectAllCards,
  selectActiveCard,
  selectFilteredCards,
  selectActiveCardIndex,
  selectCardCount,
  setActiveCard,
  nextCard,
  previousCard,
} from "@store/slices/cardsSlice";
import { Card } from "../types";

/**
 * Custom hook for accessing and manipulating cards
 * Provides convenient access to card state and actions
 */
export const useCards = () => {
  const dispatch = useAppDispatch();
  const allCards = useAppSelector(selectAllCards);
  const activeCard = useAppSelector(selectActiveCard);
  const filteredCards = useAppSelector(selectFilteredCards);
  const activeCardIndex = useAppSelector(selectActiveCardIndex);
  const cardCount = useAppSelector(selectCardCount);

  // Functions to navigate between cards
  const goToNextCard = useCallback(() => {
    dispatch(nextCard());
  }, [dispatch]);

  const goToPreviousCard = useCallback(() => {
    dispatch(previousCard());
  }, [dispatch]);

  const goToCard = useCallback(
    (cardId: string) => {
      dispatch(setActiveCard(cardId));
    },
    [dispatch]
  );

  // Calculate progress percentage
  const progress = cardCount > 0 ? (activeCardIndex + 1) / cardCount : 0;

  // Check if can navigate
  const canGoNext = activeCardIndex < cardCount - 1;
  const canGoPrevious = activeCardIndex > 0;

  return {
    // State
    activeCard,
    allCards,
    filteredCards,
    activeCardIndex,
    cardCount,
    progress,

    // Navigation
    goToNextCard,
    goToPreviousCard,
    goToCard,
    canGoNext,
    canGoPrevious,
  };
};

export default useCards;
