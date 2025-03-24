import { StyleSheet, Dimensions } from 'react-native';
import type { CardStylesConfig } from './card-types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Default style configuration
export const defaultStylesConfig: CardStylesConfig = {
  width: SCREEN_WIDTH - 32, // Full width minus margins
  margin: 8,
  borderRadius: 16,
  elevation: 4,
  shadow: {
    color: '#000',
    offset: { width: 0, height: 2 },
    opacity: 0.1,
    radius: 4,
  },
};

export const createCardStyles = (config: Partial<CardStylesConfig> = {}) => {
  const finalConfig = { ...defaultStylesConfig, ...config };

  return StyleSheet.create({
    container: {
      width: finalConfig.width,
      margin: finalConfig.margin,
      borderRadius: finalConfig.borderRadius,
      elevation: finalConfig.elevation,
      shadowColor: finalConfig.shadow.color,
      shadowOffset: finalConfig.shadow.offset,
      shadowOpacity: finalConfig.shadow.opacity,
      shadowRadius: finalConfig.shadow.radius,
    },
    content: {
      padding: 20,
    },
    loadingPlaceholder: {
      height: 100,
      backgroundColor: '#f0f0f0',
    },
  });
};

// Export default styles instance
export const styles = createCardStyles();

// Helper for combining animation styles
export const combineAnimationStyles = (
  baseStyles: any[],
  {
    enableSwipe = false,
    enableFlip = false,
    isFlipped = false,
    cardStyle = {},
    frontStyle = {},
    backStyle = {},
  }
) => {
  const combinedStyles = [...baseStyles];

  if (enableSwipe) {
    Object.assign(combinedStyles, cardStyle);
  }
  if (enableFlip) {
    Object.assign(combinedStyles, isFlipped ? backStyle : frontStyle);
  }

  return combinedStyles;
};
