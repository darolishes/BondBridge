export type ThemeMode = 'light' | 'dark';

export interface Theme {
  colors: {
    // Background colors
    background: string;
    surface: string;
    surfaceHighlight: string;

    // Text colors
    text: string;
    textSecondary: string;
    textTertiary: string;

    // UI element colors
    primary: string;
    primaryLight: string;
    error: string;
    errorLight: string;
    success: string;
    successLight: string;

    // Card colors
    cardBackground: string;
    cardBorder: string;

    // Progress colors
    progress: string;
    progressBackground: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}
