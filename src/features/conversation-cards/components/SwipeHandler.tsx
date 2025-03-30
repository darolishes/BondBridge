import React, { useCallback, useRef } from "react";
import { StyleSheet, ViewStyle, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useSwipePerformance } from "../hooks/useSwipePerformance";
import { useWebSwipe } from "../hooks/useWebSwipe";
import { useBrowserOptimizations } from "../hooks/useBrowserOptimizations";
import { convertStyleToWeb, mergeStyles } from "../utils/styleConverter";
import { PerformanceOverlay } from "./PerformanceOverlay";
import { haptics } from "../services/HapticService";

interface SwipeHandlerProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeThreshold?: number;
  enableDebug?: boolean;
  enableHaptics?: boolean;
  style?: ViewStyle;
}

const SPRING_CONFIG = {
  stiffness: 150,
  damping: 15,
  mass: 0.8,
  overshootClamping: false,
};

export function SwipeHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  swipeThreshold = 100,
  enableDebug = false,
  enableHaptics = true,
  style,
}: SwipeHandlerProps) {
  const translationX = useSharedValue(0);
  const context = useRef({ startX: 0 });

  const { metrics, startTracking, updatePosition, stopTracking } =
    useSwipePerformance({
      targetFps: 60,
      sampleSize: 60,
      enableDebug,
    });

  const {
    styles: browserStyles,
    eventOptions,
    isReducedMotion,
    isLoading: browserOptLoading,
  } = useBrowserOptimizations();

  const cssTransition = isReducedMotion
    ? "none"
    : "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  const triggerHapticFeedback = useCallback(
    (progress: number) => {
      if (!enableHaptics) return;
      haptics.swipeProgress(progress);
    },
    [enableHaptics]
  );

  const handleSwipeComplete = useCallback(
    async (direction: "left" | "right") => {
      if (enableHaptics) {
        await haptics.swipeComplete(true);
      }

      if (direction === "left" && onSwipeLeft) {
        onSwipeLeft();
      } else if (direction === "right" && onSwipeRight) {
        onSwipeRight();
      }
    },
    [onSwipeLeft, onSwipeRight, enableHaptics]
  );

  const handleSwipeCancelled = useCallback(async () => {
    if (enableHaptics) {
      await haptics.impact("light");
    }
  }, [enableHaptics]);

  // Web-spezifische Swipe-Logik
  const { getProps: getWebProps } = useWebSwipe({
    enabled: Platform.OS === "web",
    onSwipeLeft,
    onSwipeRight,
    swipeThreshold,
    onSwipeProgress: triggerHapticFeedback,
    cssTransition,
    ...eventOptions,
  });

  // Native Gesture Handler
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, ctx) => {
      ctx.startX = translationX.value;
      runOnJS(startTracking)(translationX.value, 0);
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.startX + event.translationX;
      runOnJS(updatePosition)(translationX.value, 0);

      const progress = Math.abs(event.translationX) / swipeThreshold;
      runOnJS(triggerHapticFeedback)(progress);
    },
    onEnd: (event) => {
      runOnJS(stopTracking)();

      const shouldSwipe = Math.abs(event.translationX) > swipeThreshold;
      if (shouldSwipe) {
        const direction = event.translationX > 0 ? "right" : "left";
        const finalPosition = direction === "right" ? 400 : -400;

        translationX.value = withSpring(finalPosition, SPRING_CONFIG, () => {
          runOnJS(handleSwipeComplete)(direction);
        });
      } else {
        translationX.value = withSpring(0, SPRING_CONFIG, () => {
          runOnJS(handleSwipeCancelled)();
        });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  // Web-Version
  if (Platform.OS === "web") {
    if (browserOptLoading) {
      // Einfacher Fallback während der Initialisierung
      const baseStyles = mergeStyles(styles.container, style);
      return <div style={convertStyleToWeb(baseStyles)}>{children}</div>;
    }

    const webProps = getWebProps();
    const allStyles = mergeStyles(
      styles.container,
      style,
      browserStyles as ViewStyle,
      webProps.style as ViewStyle
    );

    return (
      <div {...webProps} style={convertStyleToWeb(allStyles)}>
        <div style={convertStyleToWeb(styles.content)}>{children}</div>
        {enableDebug && (
          <PerformanceOverlay
            metrics={metrics}
            showDetails={true}
            position="top-right"
          />
        )}
      </div>
    );
  }

  // Native Version
  return (
    <GestureHandlerRootView style={[styles.container, style]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.content, animatedStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
      {enableDebug && (
        <PerformanceOverlay
          metrics={metrics}
          showDetails={true}
          position="top-right"
        />
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
