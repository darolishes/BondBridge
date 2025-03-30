/**
 * Color tokens for the BondBridge application
 * Single source of truth for all colors used in the app
 */

// Unified color palette
export const palette = {
  primary: {
    light: "#4A6FA5",
    dark: "#6889BA",
  },
  secondary: {
    light: "#9BB1D3",
    dark: "#7F95B7",
  },
  accent: {
    light: "#FF6B6B",
    dark: "#FF8080",
  },
  neutral: {
    white: "#FFFFFF",
    backgroundLight: "#F8F9FA",
    surfaceLight: "#E9ECEF",
    textLight: "#495057",
    backgroundDark: "#121212",
    surfaceDark: "#1E1E1E",
    textDark: "#FFFFFF",
  },
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
  categories: {
    icebreakers: "#5BC0EB",
    confessions: "#F44336",
    personality: "#9C27B0",
    deepThoughts: "#3F51B5",
    intimacy: "#FF9800",
    growth: "#4CAF50",
  },
};

// Semantic color tokens
export const semanticColors = {
  light: {
    primary: palette.primary.light,
    secondary: palette.secondary.light,
    accent: palette.accent.light,
    background: palette.neutral.backgroundLight,
    surface: palette.neutral.white,
    text: palette.neutral.textLight,
    textSecondary: palette.neutral.surfaceLight,
    error: palette.status.error.light,
    warning: palette.status.warning.light,
    success: palette.status.success.light,
    card: {
      border: palette.neutral.surfaceLight,
      shadow: "rgba(0, 0, 0, 0.1)",
    },
  },
  dark: {
    primary: palette.primary.dark,
    secondary: palette.secondary.dark,
    accent: palette.accent.dark,
    background: palette.neutral.backgroundDark,
    surface: palette.neutral.surfaceDark,
    text: palette.neutral.textDark,
    textSecondary: palette.neutral.surfaceLight,
    error: palette.status.error.dark,
    warning: palette.status.warning.dark,
    success: palette.status.success.dark,
    card: {
      border: palette.neutral.surfaceDark,
      shadow: "rgba(0, 0, 0, 0.3)",
    },
  },
};
