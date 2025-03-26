/**
 * Typography tokens for the BondBridge application
 * Single source of truth for all typography values used in the app
 */

// Font families - use system fonts for MVP
export const fontFamilies = {
  // System fonts from uiPrinciples.md
  ios: "San Francisco",
  android: "Roboto",
};

// Font sizes
export const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
};

// Font weights (using React Native compatible values)
export const fontWeights = {
  light: "300",
  regular: "400",
  medium: "500",
  bold: "700",
};

// Line heights
export const lineHeights = {
  small: 16,
  medium: 24,
  large: 28,
  xlarge: 32,
};

// Typography tokens for semantic usage
export const typography = {
  h1: {
    fontSize: fontSizes.xlarge,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.xlarge,
  },
  h2: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.large,
  },
  body: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.medium,
  },
  caption: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.small,
  },
};
