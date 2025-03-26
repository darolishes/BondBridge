/**
 * Color tokens for the BondBridge application
 * Single source of truth for all colors used in the app
 */

// Base palette
export const palette = {
  // Primary colors
  blue: {
    light: "#4A6FA5",
    dark: "#6889BA",
  },
  // Secondary colors
  blueGray: {
    light: "#9BB1D3",
    dark: "#7F95B7",
  },
  // Accent colors
  red: {
    light: "#FF6B6B",
    dark: "#FF8080",
  },
  // Neutrals
  neutral: {
    white: "#FFFFFF",
    lightGray: "#F8F9FA",
    gray: "#E9ECEF",
    darkGray: "#495057",
    black: "#212529",
    darker: "#121212",
    dark: "#1E1E1E",
  },
  // Status colors
  status: {
    success: {
      light: "#28A745",
      dark: "#4CAF50",
    },
    warning: {
      light: "#FFC107",
      dark: "#FFC107",
    },
    error: {
      light: "#DC3545",
      dark: "#F44336",
    },
  },
  // Category-specific colors from the PRD
  categories: {
    icebreakers: "#5BC0EB",
    confessions: "#F44336",
    personality: "#9C27B0",
    deepThoughts: "#3F51B5",
    intimacy: "#FF9800",
    growth: "#4CAF50",
  },
};

// Semantic color tokens (these map to theme values)
export const semanticColors = {
  light: {
    primary: palette.blue.light,
    secondary: palette.blueGray.light,
    accent: palette.red.light,
    background: palette.neutral.lightGray,
    surface: palette.neutral.white,
    text: palette.neutral.black,
    textSecondary: palette.neutral.darkGray,
    error: palette.status.error.light,
    warning: palette.status.warning.light,
    success: palette.status.success.light,
    card: {
      border: palette.neutral.gray,
      shadow: "rgba(0, 0, 0, 0.1)",
    },
  },
  dark: {
    primary: palette.blue.dark,
    secondary: palette.blueGray.dark,
    accent: palette.red.dark,
    background: palette.neutral.darker,
    surface: palette.neutral.dark,
    text: palette.neutral.white,
    textSecondary: palette.neutral.gray,
    error: palette.status.error.dark,
    warning: palette.status.warning.dark,
    success: palette.status.success.dark,
    card: {
      border: "#2A2A2A",
      shadow: "rgba(0, 0, 0, 0.3)",
    },
  },
};
