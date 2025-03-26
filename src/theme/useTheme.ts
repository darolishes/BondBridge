import { useContext, createContext } from "react";
import { Theme, lightTheme } from "./themes";

// Theme-Context für die Anwendung
// In einer echten App würde dies mit Redux oder Context API verbunden sein
export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: lightTheme,
  toggleTheme: () => {},
});

/**
 * Hook für den Zugriff auf das aktuelle Theme und Theme-Funktionen
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

/**
 * Hook für die Erstellung von Theme-basierten Styles
 *
 * Beispiel:
 * ```
 * const useStyles = () => {
 *   const { theme } = useTheme();
 *
 *   return {
 *     container: {
 *       backgroundColor: theme.colors.background,
 *       padding: theme.spacing.md,
 *     },
 *     text: {
 *       color: theme.colors.text,
 *       fontSize: theme.typography.fontSizes.medium,
 *     },
 *   };
 * };
 * ```
 */
export const createUseStyles = <T extends Record<string, any>>(
  styleCreator: (theme: Theme) => T
) => {
  return (): T => {
    const { theme } = useTheme();
    return styleCreator(theme);
  };
};
