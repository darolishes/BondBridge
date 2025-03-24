import { useRef, useState, useCallback, useMemo } from 'react';
import { Animated, Platform, ViewStyle } from 'react-native';

export interface UseCardFlipConfig {
  /** Duration of the flip animation in milliseconds */
  duration?: number;
  /** Spring animation friction (lower = more bouncy) */
  friction?: number;
  /** Spring animation tension (higher = faster) */
  tension?: number;
  /** Initial flipped state */
  initialFlipped?: boolean;
  /** Whether to use spring animation instead of timing */
  useSpring?: boolean;
}

type AnimatedTransform = {
  perspective?: number;
  rotateY?: Animated.AnimatedInterpolation<string>;
}[];

interface AnimatedStyle {
  transform: AnimatedTransform;
  zIndex: number;
  backfaceVisibility: ViewStyle['backfaceVisibility'];
}

export interface UseCardFlipResult {
  /** Current flipped state */
  isFlipped: boolean;
  /** Function to trigger the flip animation */
  flipCard: () => void;
  /** Animation progress value (0-1) */
  progress: Animated.Value;
  /** Style for the front side of the card */
  frontStyle: AnimatedStyle;
  /** Style for the back side of the card */
  backStyle: AnimatedStyle;
}

const DEFAULT_CONFIG: Required<UseCardFlipConfig> = {
  duration: 400,
  friction: 8,
  tension: 10,
  initialFlipped: false,
  useSpring: true,
};

/**
 * Hook for managing card flip animations
 * @param config Configuration options for the flip animation
 * @returns Object containing flip state and animation styles
 */
export const useCardFlip = (config?: UseCardFlipConfig): UseCardFlipResult => {
  const { duration, friction, tension, initialFlipped, useSpring } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const [isFlipped, setIsFlipped] = useState(initialFlipped);
  const progress = useRef(new Animated.Value(initialFlipped ? 1 : 0)).current;

  // Platform-specific perspective value
  const perspective = Platform.select({ ios: 850, android: 1200, default: 1000 });

  /**
   * Trigger the flip animation
   */
  const flipCard = useCallback(() => {
    const toValue = isFlipped ? 0 : 1;
    setIsFlipped(!isFlipped);

    if (useSpring) {
      Animated.spring(progress, {
        toValue,
        friction,
        tension,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    }
  }, [isFlipped, progress, useSpring, duration, friction, tension]);

  // Memoize styles to prevent unnecessary recalculations
  const { frontStyle, backStyle } = useMemo(() => {
    const interpolatedRotate = progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const backRotate = progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
    });

    const baseStyle: Omit<AnimatedStyle, 'transform'> = {
      backfaceVisibility: 'hidden',
      zIndex: 0,
    };

    return {
      frontStyle: {
        ...baseStyle,
        transform: [{ perspective }, { rotateY: interpolatedRotate }],
        zIndex: isFlipped ? 0 : 1,
      },
      backStyle: {
        ...baseStyle,
        transform: [{ perspective }, { rotateY: backRotate }],
        zIndex: isFlipped ? 1 : 0,
      },
    };
  }, [progress, isFlipped, perspective]);

  return {
    isFlipped,
    flipCard,
    progress,
    frontStyle,
    backStyle,
  };
};

export default useCardFlip;
