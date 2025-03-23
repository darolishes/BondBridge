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
};

// Extend the default theme with custom colors
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: customColors.primary.light,
    secondary: customColors.secondary.light,
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: customColors.primary.dark,
    secondary: customColors.secondary.dark,
  },
};

// Theme type for TypeScript support
export type AppTheme = typeof lightTheme;
