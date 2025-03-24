import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@theme/ThemeContext';

interface SkeletonLoaderProps {
  width: number;
  testID?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width, testID }) => {
  const { theme, isDark } = useTheme();
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
          backgroundColor: isDark ? theme.colors.surface : theme.colors.background,
        },
      ]}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.image,
          {
            backgroundColor: theme.colors.surface,
            opacity,
          },
        ]}
      />
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.title,
            {
              backgroundColor: theme.colors.surface,
              opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.description,
            {
              backgroundColor: theme.colors.surface,
              opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.progress,
            {
              backgroundColor: theme.colors.surface,
              opacity,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    padding: 12,
  },
  description: {
    borderRadius: 4,
    height: 40,
    marginBottom: 8,
  },
  image: {
    height: 120,
    width: '100%',
  },
  progress: {
    borderRadius: 4,
    height: 8,
    width: '100%',
  },
  title: {
    borderRadius: 4,
    height: 24,
    marginBottom: 8,
    width: '80%',
  },
});

export default SkeletonLoader;
