import { useRef, useState } from "react";
import { Animated, PanResponder, PanResponderGestureState } from "react-native";

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface UseCardSwipeResult {
  panResponder: ReturnType<typeof PanResponder.create>;
  animatedValue: Animated.ValueXY;
  resetPosition: () => void;
  isSwipingRight: boolean;
  isSwipingLeft: boolean;
}

/**
 * Custom hook for card swiping functionality
 */
export const useCardSwipe = (
  handlers: SwipeHandlers,
  swipeThreshold = 120
): UseCardSwipeResult => {
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);

  // Create animated value for the card position
  const position = useRef(new Animated.ValueXY()).current;

  // Reset card position to center
  const resetPosition = () => {
    setIsSwipingLeft(false);
    setIsSwipingRight(false);
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  // Handle swipe completion
  const completeSwipe = (direction: "left" | "right") => {
    const x = direction === "right" ? 500 : -500;

    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (direction === "left" && handlers.onSwipeLeft) {
        handlers.onSwipeLeft();
      } else if (direction === "right" && handlers.onSwipeRight) {
        handlers.onSwipeRight();
      }
      resetPosition();
    });
  };

  // Determine whether to complete swipe based on gesture state
  const handleSwipe = (gestureState: PanResponderGestureState) => {
    const { dx } = gestureState;

    if (dx > swipeThreshold) {
      completeSwipe("right");
    } else if (dx < -swipeThreshold) {
      completeSwipe("left");
    } else {
      resetPosition();
    }
  };

  // Create pan responder for handling touch gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      position.setValue({ x: gestureState.dx, y: 0 });

      // Update swiping direction state
      setIsSwipingRight(gestureState.dx > 50);
      setIsSwipingLeft(gestureState.dx < -50);
    },
    onPanResponderRelease: (_, gestureState) => {
      handleSwipe(gestureState);
    },
  });

  return {
    panResponder,
    animatedValue: position,
    resetPosition,
    isSwipingRight,
    isSwipingLeft,
  };
};
