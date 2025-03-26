import { lightTheme, darkTheme, Theme, ThemeColors } from "./themes";
import { ThemeType } from "@common/types";

export { lightTheme, darkTheme };
export type { Theme, ThemeColors };

/**
 * Returns the appropriate theme based on theme type
 */
export const getThemeByType = (themeType: ThemeType): Theme => {
  switch (themeType) {
    case "dark":
      return darkTheme;
    case "light":
      return lightTheme;
    case "system":
      // In a real app, we would detect the system theme here
      return lightTheme;
    default:
      return lightTheme;
  }
};

/**
 * Creates theme-based styles
 * Usage example:
 *
 * const styles = createThemedStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.md,
 *   },
 *   text: {
 *     color: theme.colors.text,
 *     fontSize: theme.typography.fontSizes.medium,
 *   },
 * }));
 */
export const createThemedStyles = <T extends Record<string, any>>(
  styleCreator: (theme: Theme) => T
) => {
  return (theme: Theme): T => styleCreator(theme);
};
