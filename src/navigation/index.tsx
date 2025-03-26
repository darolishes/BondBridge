import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { TabNavigator } from "./TabNavigator";
import { useTheme } from "@theme/useTheme";
import { Theme } from "@theme/themes";

/**
 * Konvertiert unser App-Theme in ein React Navigation Theme
 */
const createNavigationTheme = (theme: Theme) => {
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
  const { theme } = useTheme();
  const navigationTheme = createNavigationTheme(theme);

  return (
    <NavigationContainer theme={navigationTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

/**
 * Hook für den Zugriff auf die Navigation außerhalb von React-Komponenten
 * Kann später für Deep-Linking und Analytics verwendet werden
 */
export * from "./navigationRef";

/**
 * Export aller Navigationstypen
 */
export * from "./types";
