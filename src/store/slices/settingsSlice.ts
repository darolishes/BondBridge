import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ThemeType } from "@theme/types";

// State interface
export interface SettingsState {
  themePreference: ThemeType;
  cardTransitionSpeed: "slow" | "medium" | "fast";
  hapticFeedback: boolean;
  showDifficulty: boolean;
  showFollowUp: boolean;
  autoPlayCards: boolean;
  autoPlayInterval: number; // in seconds
}

// Initial state
const initialState: SettingsState = {
  themePreference: "system",
  cardTransitionSpeed: "medium",
  hapticFeedback: true,
  showDifficulty: true,
  showFollowUp: true,
  autoPlayCards: false,
  autoPlayInterval: 5,
};

// Slice
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // Set theme preference
    setThemePreference: (state, action: PayloadAction<ThemeType>) => {
      state.themePreference = action.payload;
    },

    // Set card transition speed
    setCardTransitionSpeed: (
      state,
      action: PayloadAction<"slow" | "medium" | "fast">
    ) => {
      state.cardTransitionSpeed = action.payload;
    },

    // Toggle haptic feedback
    toggleHapticFeedback: (state) => {
      state.hapticFeedback = !state.hapticFeedback;
    },

    // Set haptic feedback
    setHapticFeedback: (state, action: PayloadAction<boolean>) => {
      state.hapticFeedback = action.payload;
    },

    // Toggle difficulty display
    toggleDifficultyDisplay: (state) => {
      state.showDifficulty = !state.showDifficulty;
    },

    // Set difficulty display
    setDifficultyDisplay: (state, action: PayloadAction<boolean>) => {
      state.showDifficulty = action.payload;
    },

    // Toggle follow-up questions display
    toggleFollowUpDisplay: (state) => {
      state.showFollowUp = !state.showFollowUp;
    },

    // Set follow-up questions display
    setFollowUpDisplay: (state, action: PayloadAction<boolean>) => {
      state.showFollowUp = action.payload;
    },

    // Toggle auto-play cards
    toggleAutoPlayCards: (state) => {
      state.autoPlayCards = !state.autoPlayCards;
    },

    // Set auto-play cards
    setAutoPlayCards: (state, action: PayloadAction<boolean>) => {
      state.autoPlayCards = action.payload;
    },

    // Set auto-play interval
    setAutoPlayInterval: (state, action: PayloadAction<number>) => {
      state.autoPlayInterval = action.payload;
    },

    // Reset settings to defaults
    resetSettings: () => initialState,
  },
});

// Export actions
export const {
  setThemePreference,
  setCardTransitionSpeed,
  toggleHapticFeedback,
  setHapticFeedback,
  toggleDifficultyDisplay,
  setDifficultyDisplay,
  toggleFollowUpDisplay,
  setFollowUpDisplay,
  toggleAutoPlayCards,
  setAutoPlayCards,
  setAutoPlayInterval,
  resetSettings,
} = settingsSlice.actions;

// Selectors
export const selectSettings = (state: RootState) => state.settings;
export const selectThemePreference = (state: RootState) =>
  state.settings.themePreference;
export const selectCardTransitionSpeed = (state: RootState) =>
  state.settings.cardTransitionSpeed;
export const selectHapticFeedback = (state: RootState) =>
  state.settings.hapticFeedback;
export const selectDifficultyDisplay = (state: RootState) =>
  state.settings.showDifficulty;
export const selectFollowUpDisplay = (state: RootState) =>
  state.settings.showFollowUp;
export const selectAutoPlaySettings = (state: RootState) => ({
  enabled: state.settings.autoPlayCards,
  interval: state.settings.autoPlayInterval,
});

// Export the reducer
export default settingsSlice.reducer;
