/**
 * Theme Configuration
 * Centralized theme definitions for the application
 */

import { Theme, ThemeMode, ThemeState, ThemeAction, ThemeActionType } from '../src/types/theme';
import { ANIMATION, BORDER_RADIUS, SPACING } from './constants';

/**
 * Base theme values shared between light and dark themes
 */
export const baseTheme = {
  spacing: {
    xs: SPACING.XS,
    sm: SPACING.SM,
    md: SPACING.MD,
    lg: SPACING.LG,
    xl: SPACING.XL,
    xxl: SPACING.XXL,
  },
  borderRadius: {
    sm: BORDER_RADIUS.SM,
    md: BORDER_RADIUS.MD,
    lg: BORDER_RADIUS.LG,
    pill: BORDER_RADIUS.PILL,
    circle: BORDER_RADIUS.CIRCLE,
  },
  animation: {
    fast: ANIMATION.FAST,
    normal: ANIMATION.NORMAL,
    slow: ANIMATION.SLOW,
  },
};

/**
 * Light theme configuration
 */
export const lightTheme: Theme = {
  colors: {
    // Background colors
    background: '#FFF5E1',
    surface: '#FFFFFF',
    surfaceHighlight: '#F5F5F5',
    surfaceElevated: '#F0F0F0',

    // Text colors
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textOnPrimary: '#FFFFFF',

    // UI element colors
    primary: '#4A90E2',
    primaryLight: '#E3F2FD',
    secondary: '#FF9800',
    secondaryLight: '#FFF3E0',
    error: '#FF6B6B',
    errorLight: '#FFE5E5',
    success: '#4CAF50',
    successLight: '#E8F5E9',
    warning: '#FFC107',
    warningLight: '#FFF8E1',

    // Card colors
    cardBackground: '#FFFFFF',
    cardBorder: '#E0E0E0',

    // Progress colors
    progress: '#4CAF50',
    progressBackground: '#E0E0E0',
  },
  ...baseTheme,
};

/**
 * Dark theme configuration
 */
export const darkTheme: Theme = {
  colors: {
    // Background colors
    background: '#121212',
    surface: '#1E1E1E',
    surfaceHighlight: '#2C2C2C',
    surfaceElevated: '#383838',

    // Text colors
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#808080',
    textOnPrimary: '#FFFFFF',

    // UI element colors
    primary: '#64B5F6',
    primaryLight: '#1A2733',
    secondary: '#FFB74D',
    secondaryLight: '#332B1A',
    error: '#FF8A80',
    errorLight: '#331A1A',
    success: '#81C784',
    successLight: '#1A331C',
    warning: '#FFD54F',
    warningLight: '#332C1A',

    // Card colors
    cardBackground: '#2C2C2C',
    cardBorder: '#404040',

    // Progress colors
    progress: '#81C784',
    progressBackground: '#404040',
  },
  ...baseTheme,
};

/**
 * Initial theme state
 */
export const initialThemeState: ThemeState = {
  theme: lightTheme,
  themeMode: 'system',
  isDark: false,
  isTransitioning: false,
};

/**
 * Theme reducer to handle all theme-related state updates
 */
export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case ThemeActionType.SET_THEME_MODE: {
      const themeMode = action.payload;
      const systemPreference = 'light'; // Placeholder - will be replaced by actual system preference
      const effectiveMode = themeMode === 'system' ? systemPreference : themeMode;
      const isDark = effectiveMode === 'dark';
      const theme = isDark ? darkTheme : lightTheme;

      return { ...state, themeMode, isDark, theme };
    }

    case ThemeActionType.TOGGLE_THEME: {
      const newMode = state.themeMode === 'light' ? 'dark' : 'light';
      const isDark = newMode === 'dark';
      const theme = isDark ? darkTheme : lightTheme;

      return { ...state, themeMode: newMode, isDark, theme };
    }

    case ThemeActionType.SET_SYSTEM_THEME: {
      // Only update if we're using system theme
      if (state.themeMode !== 'system') {
        return state;
      }

      const effectiveMode = action.payload;
      const isDark = effectiveMode === 'dark';
      const theme = isDark ? darkTheme : lightTheme;

      return { ...state, isDark, theme };
    }

    case ThemeActionType.START_TRANSITION:
      return { ...state, isTransitioning: true };

    case ThemeActionType.END_TRANSITION:
      return { ...state, isTransitioning: false };

    default:
      return state;
  }
};

export default {
  lightTheme,
  darkTheme,
  baseTheme,
  initialThemeState,
  themeReducer,
};
