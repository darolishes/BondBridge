/**
 * Application Constants
 * This is the centralized location for all application constants
 */

import { ImageSourcePropType } from 'react-native';

// App metadata from app.json
export const APP = {
  NAME: 'BondBridge',
  SLUG: 'bondbridge',
  VERSION: '1.0.0',
  SCHEME: 'bondbridge',
};

// Storage keys for persistent data
export const STORAGE_KEYS = {
  THEME_MODE: 'bondbridge:theme_mode',
  LANGUAGE: 'bondbridge:language',
  CARD_SETS: 'bondbridge:card_sets',
  USER_PREFERENCES: 'bondbridge:user_preferences',
};

// Animation durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Spacing values for consistent layout
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
};

// Border radius values for consistent UI elements
export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 16,
  PILL: 9999,
  CIRCLE: 9999,
};

// Image constants
export const IMAGES = {
  DEFAULT_CARD_SET_IMAGE: 'https://picsum.photos/400/300',
  PLACEHOLDER_PROFILE: require('../assets/placeholder-profile.png'),
};

// Helper function moved from src/constants/images.ts
export const getImageSource = (source: string | number | undefined): ImageSourcePropType => {
  if (!source) {
    return { uri: IMAGES.DEFAULT_CARD_SET_IMAGE };
  }

  if (typeof source === 'number') {
    return source; // Return the require() result directly
  }

  return { uri: source };
};

// API endpoints
export const API = {
  BASE_URL: 'https://api.bondbridge.app',
  TIMEOUT: 10000, // 10 seconds
};

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: true,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_ANIMATIONS: true,
};

// Card component configuration
export const CARD = {
  dimensions: {
    width: 'SCREEN_WIDTH - 32', // Will be calculated in the component
    margin: SPACING.SM,
  },
  animation: {
    flipDuration: ANIMATION.NORMAL,
    swipeThreshold: 0.25,
    rotationFactor: 1.5,
  },
  style: {
    borderRadius: BORDER_RADIUS.LG,
    elevation: 4,
    shadow: {
      color: '#000',
      offset: { width: 0, height: 2 },
      opacity: 0.1,
      radius: 4,
    },
    content: {
      padding: SPACING.MD,
    },
    loading: {
      height: 100,
      backgroundColor: '#f0f0f0',
    },
  },
};

export default {
  APP,
  STORAGE_KEYS,
  ANIMATION,
  SPACING,
  BORDER_RADIUS,
  IMAGES,
  getImageSource,
  API,
  FEATURES,
  CARD,
};
