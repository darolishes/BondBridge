/**
 * Hooks for the BondBridge theme system
 */

import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./ThemeProvider";
import { Theme, ThemeContextType } from "./types";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

/**
 * Hook to access the current theme and theme functions
 * @returns The theme context
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

/**
 * Hook for creating theme-based styles
 *
 * @example
 * ```
 * const useStyles = createThemedStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.md,
 *   },
 *   text: {
 *     color: theme.colors.text,
 *     fontSize: theme.typography.fontSizes.medium,
 *   },
 * }));
 * ```
 */
export const createThemedStyles = <T extends Record<string, any>>(
  styleCreator: (theme: Theme) => T
) => {
  return (): T => {
    const { theme } = useTheme();
    return StyleSheet.create(styleCreator(theme)) as T;
  };
};

/**
 * Hook to access navigation-specific theme properties
 * Creates a React Navigation compatible theme object
 */
export const useNavigationTheme = () => {
  const { theme, isDark } = useTheme();

  const navigationTheme = isDark ? DarkTheme : DefaultTheme;

  return {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.card.border,
      notification: theme.colors.error,
    },
  };
};
