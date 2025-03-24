/**
 * Animation Utilities
 * Shared animation helpers that use centralized configuration
 */

import { useRef, useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useConfig } from '@contexts/config-context';

/**
 * Hook to create a reusable fade animation
 *
 * @param initialValue The initial opacity value (0-1)
 * @returns Animation controls and animated value
 */
export const useFadeAnimation = (initialValue = 0) => {
  const config = useConfig();
  const opacity = useRef(new Animated.Value(initialValue)).current;

  const fadeIn = (callback?: () => void) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: config.animation.NORMAL,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(callback);
  };

  const fadeOut = (callback?: () => void) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: config.animation.NORMAL,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(callback);
  };

  return {
    opacity,
    fadeIn,
    fadeOut,
    animatedStyle: { opacity },
  };
};

/**
 * Hook to create a reusable scale animation
 *
 * @param initialValue The initial scale value
 * @returns Animation controls and animated value
 */
export const useScaleAnimation = (initialValue = 1) => {
  const config = useConfig();
  const scale = useRef(new Animated.Value(initialValue)).current;

  const scaleTo = (value: number, callback?: () => void) => {
    Animated.timing(scale, {
      toValue: value,
      duration: config.animation.NORMAL,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(callback);
  };

  const pulse = (callback?: () => void) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.05,
        duration: config.animation.FAST,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: config.animation.FAST,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  return {
    scale,
    scaleTo,
    pulse,
    animatedStyle: { transform: [{ scale }] },
  };
};

/**
 * Hook to create a shared element transition effect
 */
export const useSharedElementTransition = () => {
  const config = useConfig();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const startTransition = (callback?: () => void) => {
    setIsTransitioning(true);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -50,
        duration: config.animation.NORMAL,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: config.animation.NORMAL,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: config.animation.NORMAL,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start(() => {
      if (callback) callback();

      // Reset for next use
      setTimeout(() => {
        translateY.setValue(0);
        scale.setValue(1);
        opacity.setValue(1);
        setIsTransitioning(false);
      }, 100);
    });
  };

  return {
    isTransitioning,
    startTransition,
    animatedStyle: {
      transform: [{ translateY }, { scale }],
      opacity,
    },
  };
};
