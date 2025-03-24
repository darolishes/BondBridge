import { Theme } from '@types';

// Base spacing and border radius values
const baseSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const baseBorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
};

// Light theme
export const lightTheme: Theme = {
  colors: {
    // Background colors
    background: '#FFF5E1',
    surface: '#FFFFFF',
    surfaceHighlight: '#F5F5F5',

    // Text colors
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',

    // UI element colors
    primary: '#4A90E2',
    primaryLight: '#E3F2FD',
    error: '#FF6B6B',
    errorLight: '#FFE5E5',
    success: '#4CAF50',
    successLight: '#E8F5E9',

    // Card colors
    cardBackground: '#FFFFFF',
    cardBorder: '#E0E0E0',

    // Progress colors
    progress: '#4CAF50',
    progressBackground: '#E0E0E0',
  },
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
};

// Dark theme
export const darkTheme: Theme = {
  colors: {
    // Background colors
    background: '#121212',
    surface: '#1E1E1E',
    surfaceHighlight: '#2C2C2C',

    // Text colors
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#808080',

    // UI element colors
    primary: '#64B5F6',
    primaryLight: '#1A2733',
    error: '#FF8A80',
    errorLight: '#331A1A',
    success: '#81C784',
    successLight: '#1A331C',

    // Card colors
    cardBackground: '#2C2C2C',
    cardBorder: '#404040',

    // Progress colors
    progress: '#81C784',
    progressBackground: '#404040',
  },
  spacing: baseSpacing,
  borderRadius: baseBorderRadius,
};
