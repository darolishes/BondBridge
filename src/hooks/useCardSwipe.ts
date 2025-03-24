import { useRef, useMemo, useCallback } from 'react';
import { PanResponder, Animated, PanResponderGestureState, ViewStyle } from 'react-native';

export interface UseCardSwipeConfig {
  /** Minimum distance (px) to trigger swipe */
  swipeThreshold?: number;
  /** Maximum rotation angle during swipe */
  rotationFactor?: number;
  /** Callback when card is swiped left */
  onSwipeLeft?: () => void;
  /** Callback when card is swiped right */
  onSwipeRight?: () => void;
  /** Animation duration for reset */
  resetDuration?: number;
  /** Whether to enable vertical swiping */
  enableVerticalSwipe?: boolean;
}

export interface UseCardSwipeResult {
  /** Pan responder handlers */
  panResponder: ReturnType<typeof PanResponder.create>;
  /** Current swipe animation value */
  swipeAnim: {
    translateX: Animated.Value;
    translateY: Animated.Value;
    rotate: Animated.Value;
  };
  /** Current swipe direction */
  swipeDirection: 'left' | 'right' | 'up' | 'down' | null;
  /** Reset card position */
  resetPosition: () => void;
  /** Animated style for the card */
  cardStyle: Animated.WithAnimatedValue<ViewStyle>;
}

const DEFAULT_CONFIG: Required<UseCardSwipeConfig> = {
  swipeThreshold: 120,
  rotationFactor: 7,
  onSwipeLeft: () => {},
  onSwipeRight: () => {},
  resetDuration: 200,
  enableVerticalSwipe: false,
};

/**
 * Hook for managing card swipe gestures and animations
 * @param config Configuration options for swipe behavior
 * @returns Object containing pan responder and animation values
 */
export const useCardSwipe = (config?: UseCardSwipeConfig): UseCardSwipeResult => {
  const {
    swipeThreshold,
    rotationFactor,
    onSwipeLeft,
    onSwipeRight,
    resetDuration,
    enableVerticalSwipe,
  } = { ...DEFAULT_CONFIG, ...config };

  // Animation values
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  // Track current swipe direction
  const swipeDirectionRef = useRef<UseCardSwipeResult['swipeDirection']>(null);

  /**
   * Reset card position with animation
   */
  const resetPosition = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: resetDuration,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: resetDuration,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: resetDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      swipeDirectionRef.current = null;
    });
  }, [translateX, translateY, rotate, resetDuration]);

  /**
   * Handle swipe gesture state
   */
  const handlePanResponderMove = useCallback(
    (_: any, { dx, dy }: PanResponderGestureState) => {
      translateX.setValue(dx);
      if (enableVerticalSwipe) {
        translateY.setValue(dy);
      }
      rotate.setValue((dx / 200) * rotationFactor);

      // Update swipe direction
      if (Math.abs(dx) > Math.abs(dy)) {
        swipeDirectionRef.current = dx > 0 ? 'right' : 'left';
      } else if (enableVerticalSwipe && Math.abs(dy) > Math.abs(dx)) {
        swipeDirectionRef.current = dy > 0 ? 'down' : 'up';
      }
    },
    [translateX, translateY, rotate, rotationFactor, enableVerticalSwipe]
  );

  /**
   * Handle release of swipe gesture
   */
  const handlePanResponderRelease = useCallback(
    (_: any, { dx, dy, vx, vy }: PanResponderGestureState) => {
      const horizontalSwipe = Math.abs(dx) > swipeThreshold;
      const verticalSwipe = enableVerticalSwipe && Math.abs(dy) > swipeThreshold;

      if (horizontalSwipe) {
        const toValue = dx > 0 ? 500 : -500;
        Animated.timing(translateX, {
          toValue,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          if (dx > 0) {
            onSwipeRight();
          } else {
            onSwipeLeft();
          }
          resetPosition();
        });
      } else if (verticalSwipe) {
        const toValue = dy > 0 ? 500 : -500;
        Animated.timing(translateY, {
          toValue,
          duration: 200,
          useNativeDriver: true,
        }).start(resetPosition);
      } else {
        resetPosition();
      }
    },
    [
      translateX,
      translateY,
      swipeThreshold,
      enableVerticalSwipe,
      onSwipeLeft,
      onSwipeRight,
      resetPosition,
    ]
  );

  // Create pan responder
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, { dx, dy }) => {
          const isHorizontalSwipe = Math.abs(dx) > 2;
          const isVerticalSwipe = enableVerticalSwipe && Math.abs(dy) > 2;
          return isHorizontalSwipe || isVerticalSwipe;
        },
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: handlePanResponderRelease,
        onPanResponderTerminate: resetPosition,
      }),
    [handlePanResponderMove, handlePanResponderRelease, resetPosition, enableVerticalSwipe]
  );

  // Create animated style
  const cardStyle = useMemo(() => {
    const rotateStr = rotate.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg'],
    });

    return {
      transform: [{ translateX }, { translateY }, { rotate: rotateStr }],
    };
  }, [translateX, translateY, rotate]);

  return {
    panResponder,
    swipeAnim: { translateX, translateY, rotate },
    swipeDirection: swipeDirectionRef.current,
    resetPosition,
    cardStyle,
  };
};

export default useCardSwipe;
