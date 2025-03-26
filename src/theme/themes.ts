/**
 * Theme definitions for BondBridge
 * Using centralized constants for a single source of truth
 */

import {
  semanticColors,
  fontSizes,
  fontWeights,
  spacing,
  borderRadius,
} from "./constants";
import { Theme } from "./types";

/**
 * Light theme definition
 */
export const lightTheme: Theme = {
  name: "light",
  isDark: false,
  colors: semanticColors.light,
  typography: {
    fontSizes,
    fontWeights,
  },
  spacing,
  borderRadius,
};

/**
 * Dark theme definition
 */
export const darkTheme: Theme = {
  name: "dark",
  isDark: true,
  colors: semanticColors.dark,
  typography: {
    fontSizes,
    fontWeights,
  },
  spacing,
  borderRadius,
};
