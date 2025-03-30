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

// Font sizes (based on 4px grid)
export const fontSizes = {
  small: 12, // 12px
  medium: 16, // 16px
  large: 20, // 20px
  xlarge: 24, // 24px
};

// Font weights
export const fontWeights = {
  light: "300",
  regular: "400",
  medium: "500",
  bold: "700",
};

// Line heights (1.5x font size)
export const lineHeights = {
  small: 18, // 12 * 1.5
  medium: 24, // 16 * 1.5
  large: 30, // 20 * 1.5
  xlarge: 36, // 24 * 1.5
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
