/**
 * Spacing tokens for the BondBridge application
 * Based on the 8-point grid system specified in uiPrinciples.md
 */

// Base spacing unit
const SPACING_UNIT = 4;

// Spacing scale
export const spacing = {
  // Using the 8px grid system from uiPrinciples.md
  // But keeping the existing xs, sm, md, lg, xl naming convention
  xs: SPACING_UNIT, // 4px
  sm: SPACING_UNIT * 2, // 8px
  md: SPACING_UNIT * 4, // 16px
  lg: SPACING_UNIT * 6, // 24px
  xl: SPACING_UNIT * 8, // 32px
};

// Spacing for specific UI elements
export const elementSpacing = {
  card: {
    padding: spacing.md,
    margin: spacing.sm,
  },
  container: {
    padding: spacing.md,
  },
  button: {
    padding: spacing.sm,
  },
};
