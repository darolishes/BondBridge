/**
 * Style Utilities
 * Shared style helpers that use centralized configuration
 */

import { useConfig } from '@contexts/ConfigContext';
import { Theme } from '@types';
import { StyleSheet } from 'react-native';

/**
 * Create reusable themed styles using the centralized config
 */
export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleCreator: (theme: Theme, isDark: boolean) => T
): T => {
  const config = useConfig();
  const { theme, isDark } = {
    theme: config.theme.light,
    isDark: false,
  }; // Default to light theme until theme context is migrated

  return StyleSheet.create(styleCreator(theme, isDark));
};

/**
 * Common container styles with proper spacing from config
 */
export const createContainerStyles = (theme: Theme) => ({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },

  section: {
    marginVertical: theme.spacing.md,
  },

  card: {
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
});

/**
 * Common typography styles
 */
export const createTypographyStyles = (theme: Theme) => ({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },

  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  body: {
    fontSize: 16,
    color: theme.colors.text,
  },

  caption: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});

/**
 * Common button styles
 */
export const createButtonStyles = (theme: Theme) => ({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  buttonText: {
    color: theme.colors.textOnPrimary,
    fontWeight: '600',
    fontSize: 16,
  },

  buttonDisabled: {
    backgroundColor: theme.colors.surfaceHighlight,
  },

  buttonTextDisabled: {
    color: theme.colors.textSecondary,
  },
});
