import { Platform } from 'react-native';

export const palette = {
  // Primary colors
  blue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  // Neutral colors
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  // Semantic colors
  success: {
    light: '#4CAF50',
    main: '#2E7D32',
    dark: '#1B5E20',
  },
  error: {
    light: '#EF5350',
    main: '#D32F2F',
    dark: '#C62828',
  },
  warning: {
    light: '#FFB74D',
    main: '#F57C00',
    dark: '#E65100',
  },
  info: {
    light: '#4FC3F7',
    main: '#0288D1',
    dark: '#01579B',
  },
};

export const colors = {
  primary: palette.blue[500],
  primaryDark: palette.blue[700],
  primaryLight: palette.blue[300],
  
  // Text colors
  text: {
    primary: palette.gray[900],
    secondary: palette.gray[600],
    disabled: palette.gray[400],
    inverse: palette.gray[50],
  },
  
  // Background colors
  background: {
    default: palette.gray[50],
    paper: '#FFFFFF',
    elevated: Platform.select({
      ios: '#FFFFFF',
      android: '#FFFFFF',
      web: '#FFFFFF',
    }),
  },
  
  // Border colors
  border: {
    light: palette.gray[200],
    main: palette.gray[300],
    dark: palette.gray[400],
  },
  
  // Action colors
  action: {
    active: palette.gray[600],
    hover: palette.gray[100],
    selected: palette.blue[50],
    disabled: palette.gray[300],
    disabledBackground: palette.gray[200],
    focus: palette.blue[100],
  },
  
  // Semantic colors
  success: palette.success.main,
  error: palette.error.main,
  warning: palette.warning.main,
  info: palette.info.main,
} as const;