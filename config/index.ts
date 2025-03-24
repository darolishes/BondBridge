/**
 * Config Index
 * Exports all configurations in a single entry point
 */

import * as constants from './constants';
import * as paths from './paths';
import * as theme from './theme';

/**
 * Application configuration object
 * This provides a unified interface to access all configuration settings
 */
export const appConfig = {
  // App metadata
  app: constants.APP,

  // Storage keys
  storage: constants.STORAGE_KEYS,

  // Animation constants
  animation: constants.ANIMATION,

  // Layout constants
  spacing: constants.SPACING,
  borderRadius: constants.BORDER_RADIUS,

  // Assets
  images: constants.IMAGES,

  // API configuration
  api: constants.API,

  // Feature flags
  features: constants.FEATURES,

  // Theme configuration
  theme: {
    light: theme.lightTheme,
    dark: theme.darkTheme,
    base: theme.baseTheme,
  },

  // Component configurations
  components: {
    card: constants.CARD,
  },

  // Helper utilities
  utils: {
    getImageSource: constants.getImageSource,
  },
};

// Re-export individual modules for direct access
export { constants, paths, theme };

// Default export of the unified config
export default appConfig;
