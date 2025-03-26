import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25; // 25% of screen width

interface SwipeHandlerProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeEnabled?: boolean;
  swipeThreshold?: number;
  animationDuration?: number;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
  };
}

/**
 * SwipeHandler Component
 * ----------------------
 * Wraps content in swipe gesture functionality.
 * Handles left and right swipe gestures with animations.
 */
const SwipeHandler: React.FC<SwipeHandlerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  swipeEnabled = true,
  swipeThreshold = SWIPE_THRESHOLD,
  animationDuration = 300,
  springConfig = { damping: 10, stiffness: 100, mass: 1 },
}) => {
  // Animation values
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  // For regular Animated API (legacy React Native animations)
  const pan = useRef(new Animated.ValueXY()).current;

  const resetPosition = () => {
    translateX.value = withSpring(0, springConfig);
    rotate.value = withSpring(0, springConfig);
    opacity.value = withTiming(1, { duration: animationDuration });
  };

  const completeSwipeLeft = () => {
    translateX.value = withTiming(-SCREEN_WIDTH * 1.5, {
      duration: animationDuration,
    });
    opacity.value = withTiming(0, { duration: animationDuration });
    if (onSwipeLeft) {
      setTimeout(() => {
        onSwipeLeft();
        translateX.value = 0;
        rotate.value = 0;
        opacity.value = 1;
      }, animationDuration);
    }
  };

  const completeSwipeRight = () => {
    translateX.value = withTiming(SCREEN_WIDTH * 1.5, {
      duration: animationDuration,
    });
    opacity.value = withTiming(0, { duration: animationDuration });
    if (onSwipeRight) {
      setTimeout(() => {
        onSwipeRight();
        translateX.value = 0;
        rotate.value = 0;
        opacity.value = 1;
      }, animationDuration);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      if (!swipeEnabled) return;

      translateX.value = context.startX + event.translationX;
      // Calculate rotation based on swipe distance (max 15 degrees)
      rotate.value = (translateX.value / SCREEN_WIDTH) * 15;

      // Gradually reduce opacity as card moves further from center
      const distanceRatio = Math.abs(translateX.value) / (SCREEN_WIDTH / 2);
      opacity.value = Math.max(1 - distanceRatio * 0.2, 0.8);
    },
    onEnd: (event) => {
      if (!swipeEnabled) return;

      if (translateX.value < -swipeThreshold) {
        if (onSwipeLeft) {
          runOnJS(completeSwipeLeft)();
        } else {
          runOnJS(resetPosition)();
        }
      } else if (translateX.value > swipeThreshold) {
        if (onSwipeRight) {
          runOnJS(completeSwipeRight)();
        } else {
          runOnJS(resetPosition)();
        }
      } else {
        runOnJS(resetPosition)();
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler} enabled={swipeEnabled}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SwipeHandler;
