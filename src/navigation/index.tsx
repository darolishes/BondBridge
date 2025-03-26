import React from "react";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { TabNavigator } from "./TabNavigator";
import { useTheme } from "@theme/ThemeProvider";
import { Theme } from "@theme/themes";

/**
 * Navigation
 * ----------
 * Root-Navigationskomponente, die die Tab-Navigation aufbaut.
 *
 * @component
 * @core
 */

/**
 * Konvertiert unser App-Theme in ein React Navigation Theme
 */
export const createNavigationTheme = (theme: Theme) => {
  const navigationTheme = theme.isDark ? DarkTheme : DefaultTheme;

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

/**
 * Root-Navigator der App, kombiniert alles
 */
export const Navigation = () => {
  return <TabNavigator />;
};

/**
 * Export aller Navigationstypen und Hilfsfunktionen
 */
export * from "./types";
