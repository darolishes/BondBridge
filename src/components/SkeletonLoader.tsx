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
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#F0F0F0',
  },
  content: {
    padding: 12,
  },
  title: {
    height: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
    width: '80%',
  },
  description: {
    height: 32,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    width: '100%',
  },
});

export default SkeletonLoader;
