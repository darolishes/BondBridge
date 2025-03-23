import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SkeletonLoaderProps {
  width: number;
  testID?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width, testID }) => {
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
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={[styles.container, { width }]} testID={testID}>
      <Animated.View style={[styles.image, { opacity }]} />
      <View style={styles.content}>
        <Animated.View style={[styles.title, { opacity }]} />
        <Animated.View style={[styles.description, { opacity }]} />
        <Animated.View style={[styles.progressBar, { opacity }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    height: 32,
    marginBottom: 12,
  },
  image: {
    backgroundColor: '#F0F0F0',
    height: 120,
    width: '100%',
  },
  progressBar: {
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    height: 4,
    width: '100%',
  },
  title: {
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    height: 20,
    marginBottom: 8,
    width: '80%',
  },
});

export default SkeletonLoader;
