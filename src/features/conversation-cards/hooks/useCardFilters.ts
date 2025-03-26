import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  selectSelectedCategories,
  selectAvailableCategories,
  selectDifficultyRange,
  selectSearchTerm,
  selectCardStatus,
  toggleCategory,
  setSelectedCategories,
  setDifficultyRange,
  setSearchTerm,
  setCardStatus,
  resetFilters,
} from "@store/slices/filtersSlice";
import { setFilteredCardIds, selectAllCards } from "@store/slices/cardsSlice";
import { CardCategory, Card } from "@features/conversation-cards/types";

/**
 * Custom hook for filtering cards
 * Provides access to filter state and actions,
 * automatically applies filters to cards
 */
export const useCardFilters = () => {
  const dispatch = useAppDispatch();

  // Select filter state
  const selectedCategories = useAppSelector(selectSelectedCategories);
  const availableCategories = useAppSelector(selectAvailableCategories);
  const difficultyRange = useAppSelector(selectDifficultyRange);
  const searchTerm = useAppSelector(selectSearchTerm);
  const status = useAppSelector(selectCardStatus);

  // Select cards
  const allCards = useAppSelector(selectAllCards);

  // Filter change handlers
  const handleToggleCategory = useCallback(
    (category: CardCategory) => {
      dispatch(toggleCategory(category));
    },
    [dispatch]
  );

  const handleSetCategories = useCallback(
    (categories: CardCategory[]) => {
      dispatch(setSelectedCategories(categories));
    },
    [dispatch]
  );

  const handleSetDifficultyRange = useCallback(
    (min: number, max: number) => {
      dispatch(setDifficultyRange({ min, max }));
    },
    [dispatch]
  );

  const handleSetSearchTerm = useCallback(
    (term: string) => {
      dispatch(setSearchTerm(term));
    },
    [dispatch]
  );

  const handleSetStatus = useCallback(
    (cardStatus: any) => {
      dispatch(setCardStatus(cardStatus));
    },
    [dispatch]
  );

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  // Apply filters whenever filter state changes
  useEffect(() => {
    // Convert cards record to array with proper typing
    const cardsArray = Object.values(allCards) as Card[];

    // Apply filters
    const filteredCards = cardsArray.filter((card) => {
      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(card.category as CardCategory)
      ) {
        return false;
      }

      // Difficulty filter
      if (
        card.difficulty < difficultyRange.min ||
        card.difficulty > difficultyRange.max
      ) {
        return false;
      }

      // Search term filter
      if (
        searchTerm &&
        !card.question.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Status filter would go here if Card type had a status field

      return true;
    });

    // Update filtered card IDs in store
    dispatch(setFilteredCardIds(filteredCards.map((card) => card.id)));
  }, [
    dispatch,
    allCards,
    selectedCategories,
    difficultyRange,
    searchTerm,
    status,
  ]);

  return {
    // State
    selectedCategories,
    availableCategories,
    difficultyRange,
    searchTerm,
    status,

    // Actions
    toggleCategory: handleToggleCategory,
    setCategories: handleSetCategories,
    setDifficultyRange: handleSetDifficultyRange,
    setSearchTerm: handleSetSearchTerm,
    setStatus: handleSetStatus,
    resetFilters: handleResetFilters,

    // Helper state
    hasActiveFilters:
      selectedCategories.length > 0 ||
      searchTerm !== "" ||
      difficultyRange.min > 1 ||
      difficultyRange.max < 5,
  };
};

export default useCardFilters;
