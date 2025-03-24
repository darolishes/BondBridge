import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

// Custom colors that match your brand
const customColors = {
  primary: {
    light: '#FF6B6B',
    dark: '#FF8585',
  },
  secondary: {
    light: '#4ECDC4',
    dark: '#65E0D8',
  },
  error: '#F44336',
  errorLight: '#FFEBEE',
  success: '#4CAF50',
  successLight: '#E8F5E9',
  info: '#2196F3',
  infoLight: '#E3F2FD',
  warning: '#FFC107',
};

// Extend the default theme with custom colors
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: customColors.primary.light,
    secondary: customColors.secondary.light,
    error: customColors.error,
    errorLight: customColors.errorLight,
    success: customColors.success,
    successLight: customColors.successLight,
    info: customColors.info,
    infoLight: customColors.infoLight,
    warning: customColors.warning,
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: customColors.primary.dark,
    secondary: customColors.secondary.dark,
    error: customColors.error,
    errorLight: customColors.errorLight,
    success: customColors.success,
    successLight: customColors.successLight,
    info: customColors.info,
    infoLight: customColors.infoLight,
    warning: customColors.warning,
  },
};

// Theme type for TypeScript support
export type AppTheme = typeof lightTheme;
