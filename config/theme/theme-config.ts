import { ThemeConfig } from '../core/schema';

export const themeConfig: ThemeConfig = {
  colors: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceHighlight: '#E8E8E8',
    surfaceElevated: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textOnPrimary: '#FFFFFF',
    primary: '#007AFF',
    primaryLight: '#B3D7FF',
    border: '#E0E0E0',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    progressPrimary: '#007AFF',
    progressBackground: '#E0E0E0',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
};

// Theme-Utility-Funktionen
export const getColor = (colorKey: keyof ThemeConfig['colors']) => {
  return themeConfig.colors[colorKey];
};

export const getSpacing = (spacingKey: keyof ThemeConfig['spacing']) => {
  return themeConfig.spacing[spacingKey];
};

export const getBorderRadius = (radiusKey: keyof ThemeConfig['borderRadius']) => {
  return themeConfig.borderRadius[radiusKey];
};

// Dark Mode Override
export const darkThemeConfig: ThemeConfig = {
  ...themeConfig,
  colors: {
    ...themeConfig.colors,
    background: '#000000',
    surface: '#1C1C1E',
    surfaceHighlight: '#2C2C2E',
    surfaceElevated: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#EBEBF599',
    border: '#38383A',
  },
};
