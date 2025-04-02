import { Platform } from 'react-native';

const fontConfig = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
};

export const typography = {
  h1: {
    fontFamily: fontConfig.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: Platform.select({ ios: 0.15, android: 0, web: 0.15 }),
  },
  h2: {
    fontFamily: fontConfig.bold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: Platform.select({ ios: 0.15, android: 0, web: 0.15 }),
  },
  h3: {
    fontFamily: fontConfig.bold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: Platform.select({ ios: 0.15, android: 0, web: 0.15 }),
  },
  h4: {
    fontFamily: fontConfig.bold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: Platform.select({ ios: 0.15, android: 0, web: 0.15 }),
  },
  subtitle1: {
    fontFamily: fontConfig.medium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: Platform.select({ ios: 0.15, android: 0, web: 0.15 }),
  },
  subtitle2: {
    fontFamily: fontConfig.medium,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: Platform.select({ ios: 0.1, android: 0, web: 0.1 }),
  },
  body1: {
    fontFamily: fontConfig.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: Platform.select({ ios: 0.5, android: 0, web: 0.5 }),
  },
  body2: {
    fontFamily: fontConfig.regular,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: Platform.select({ ios: 0.25, android: 0, web: 0.25 }),
  },
  button: {
    fontFamily: fontConfig.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: Platform.select({ ios: 0.4, android: 0, web: 0.4 }),
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily: fontConfig.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: Platform.select({ ios: 0.4, android: 0, web: 0.4 }),
  },
  overline: {
    fontFamily: fontConfig.medium,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: Platform.select({ ios: 1.5, android: 0, web: 1.5 }),
    textTransform: 'uppercase' as const,
  },
} as const;