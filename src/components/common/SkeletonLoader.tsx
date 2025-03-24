import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@theme/ThemeContext';

interface SkeletonLoaderProps {
  width: number;
  height?: number;
  testID?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width, height = width * 1.5, testID }) => {
  const { theme } = useTheme();
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor: theme.colors.surfaceHighlight,
        },
      ]}
      testID={testID}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity,
            backgroundColor: theme.colors.surface,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default SkeletonLoader;
