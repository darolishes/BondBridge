import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { CardCategory } from "@features/conversation-cards/types";
import { CardStatus } from "@common/types/card";

// State interface
export interface FiltersState {
  categories: {
    selected: CardCategory[];
    available: CardCategory[];
  };
  difficulty: {
    min: number;
    max: number;
  };
  searchTerm: string;
  cardStatus: CardStatus;
  activeCardSetId: string | null;
}

// Initial state with all available categories
const initialState: FiltersState = {
  categories: {
    selected: [
      "icebreakers",
      "confessions",
      "personality",
      "deepThoughts",
      "intimacy",
      "growth",
    ],
    available: [
      "icebreakers",
      "confessions",
      "personality",
      "deepThoughts",
      "intimacy",
      "growth",
    ],
  },
  difficulty: {
    min: 1,
    max: 5,
  },
  searchTerm: "",
  cardStatus: "unseen",
  activeCardSetId: null,
};

// Slice
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Toggle a category filter
    toggleCategory: (state, action: PayloadAction<CardCategory>) => {
      const category = action.payload;
      const index = state.categories.selected.indexOf(category);

      if (index === -1) {
        // Add category
        state.categories.selected.push(category);
      } else {
        // Remove category
        state.categories.selected.splice(index, 1);
      }
    },

    // Set all selected categories
    setSelectedCategories: (state, action: PayloadAction<CardCategory[]>) => {
      state.categories.selected = action.payload;
    },

    // Set difficulty range
    setDifficultyRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.difficulty = action.payload;
    },

    // Set search term
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    // Set card status filter
    setCardStatus: (state, action: PayloadAction<CardStatus>) => {
      state.cardStatus = action.payload;
    },

    // Set active card set for filtering
    setActiveCardSet: (state, action: PayloadAction<string | null>) => {
      state.activeCardSetId = action.payload;
    },

    // Reset all filters
    resetFilters: (state) => {
      state.categories.selected = [];
      state.difficulty = { min: 1, max: 5 };
      state.searchTerm = "";
      state.cardStatus = "unseen";
      // Don't reset active card set, as that's a navigation state
    },
  },
});

// Export actions
export const {
  toggleCategory,
  setSelectedCategories,
  setDifficultyRange,
  setSearchTerm,
  setCardStatus,
  setActiveCardSet,
  resetFilters,
} = filtersSlice.actions;

// Selectors
export const selectAllFilters = (state: RootState) => state.filters;
export const selectSelectedCategories = (state: RootState) =>
  state.filters.categories.selected;
export const selectAvailableCategories = (state: RootState) =>
  state.filters.categories.available;
export const selectDifficultyRange = (state: RootState) =>
  state.filters.difficulty;
export const selectSearchTerm = (state: RootState) => state.filters.searchTerm;
export const selectCardStatus = (state: RootState) => state.filters.cardStatus;
export const selectActiveCardSetId = (state: RootState) =>
  state.filters.activeCardSetId;

// Export the reducer
export default filtersSlice.reducer;
