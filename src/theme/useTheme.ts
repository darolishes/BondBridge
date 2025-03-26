import { StyleSheet } from "react-native";
import { Theme } from "./themes";
import { useTheme } from "./ThemeProvider";

/**
 * Hook für die Erstellung von Theme-basierten Styles
 *
 * Beispiel:
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
 * Re-Export des useTheme Hooks aus dem ThemeProvider
 */
export { useTheme } from "./ThemeProvider";
