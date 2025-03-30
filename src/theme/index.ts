/**
 * Theme system for BondBridge
 */

// Import constants
import { colors } from "./constants/colors";
import { spacing } from "./constants/spacing";
import { uiComponents } from "./constants/uiComponents";

// Export types
export * from "./types";

// Export constants
export { colors } from "./constants/colors";
export { spacing } from "./constants/spacing";
export { uiComponents } from "./constants/uiComponents";

// Export provider component
export { ThemeProvider, ThemeContext } from "./ThemeProvider";

// Export hooks
export { useTheme, createThemedStyles, useNavigationTheme } from "./hooks";

// Export default theme
export const defaultTheme = {
  colors,
  spacing,
  uploadComponents: uiComponents,
};
