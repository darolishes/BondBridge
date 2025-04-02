export * from './colors';
export * from './typography';
export * from './spacing';

import { colors } from './colors';
import { typography } from './typography';
import { spacing, layout, radius } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  layout,
  radius,
} as const;

export type Theme = typeof theme;