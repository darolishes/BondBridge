/**
 * Represents the available theme modes for the application
 * - 'light': Light theme
 * - 'dark': Dark theme
 * - 'system': Automatically follows the device's theme setting
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Represents the theme configuration for the application
 */
export interface Theme {
  /**
   * Color palette used throughout the application
   */
  colors: {
    // Background colors
    background: string;
    surface: string;
    surfaceHighlight: string;
    surfaceElevated: string;

    // Text colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    textOnPrimary: string;

    // UI element colors
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    border: string;
    divider: string;

    // Card colors
    cardBackground: string;
    cardBorder: string;

    // Progress colors
    progress: string;
    progressBackground: string;
  };

  /**
   * Spacing values for consistent layout
   */
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };

  /**
   * Border radius values for consistent UI elements
   */
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
    circle: number;
  };

  /**
   * Animation durations for transitions
   */
  animation: {
    fast: number;
    normal: number;
    slow: number;
  };
}

/**
 * Theme context state interface
 */
export interface ThemeState {
  /**
   * Current active theme object
   */
  theme: Theme;

  /**
   * Current theme mode
   */
  themeMode: ThemeMode;

  /**
   * Whether dark mode is currently active
   */
  isDark: boolean;

  /**
   * Whether the theme is currently transitioning
   */
  isTransitioning: boolean;
}

/**
 * Theme action types
 */
export enum ThemeActionType {
  SET_THEME_MODE = 'SET_THEME_MODE',
  TOGGLE_THEME = 'TOGGLE_THEME',
  SET_SYSTEM_THEME = 'SET_SYSTEM_THEME',
  START_TRANSITION = 'START_TRANSITION',
  END_TRANSITION = 'END_TRANSITION',
}

/**
 * Theme action interface
 */
export type ThemeAction =
  | { type: ThemeActionType.SET_THEME_MODE; payload: ThemeMode }
  | { type: ThemeActionType.TOGGLE_THEME }
  | { type: ThemeActionType.SET_SYSTEM_THEME; payload: 'light' | 'dark' }
  | { type: ThemeActionType.START_TRANSITION }
  | { type: ThemeActionType.END_TRANSITION };
