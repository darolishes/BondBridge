/**
 * Type definitions for the BondBridge theme system
 */

import { semanticColors } from "./constants/colors";
import { fontSizes, fontWeights } from "./constants/typography";
import { spacing } from "./constants/spacing";
import { borderRadius } from "./constants/borderRadius";

/**
 * Possible theme modes
 */
export type ThemeType = "light" | "dark" | "system";

/**
 * Theme colors interface
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  error: string;
  warning: string;
  success: string;
  card: {
    border: string;
    shadow: string;
  };
}

/**
 * Typography configuration
 */
export interface ThemeTypography {
  fontSizes: typeof fontSizes;
  fontWeights: typeof fontWeights;
}

/**
 * Spacing configuration
 */
export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

/**
 * Border radius configuration
 */
export interface ThemeBorderRadius {
  small: number;
  medium: number;
  large: number;
}

/**
 * Complete theme interface
 */
export interface Theme {
  name: string;
  isDark: boolean;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
}

/**
 * Theme context interface
 */
export interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  isDark: boolean;
  setThemeType: (type: ThemeType) => void;
  toggleTheme: () => void;
}
