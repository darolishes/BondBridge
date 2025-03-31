import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { Check, X } from 'lucide-react-native';

interface SwipeIndicatorProps {
  direction: 'left' | 'right';
  progress: Animated.SharedValue<number>;
}

export function SwipeIndicator({ direction, progress }: SwipeIndicatorProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = withSpring(Math.min(Math.abs(progress.value) / 100, 1));
    const scale = withSpring(1 + Math.abs(progress.value) / 500);

    const color = interpolateColor(
      Math.abs(progress.value),
      [0, 100],
      [
        'rgba(255, 255, 255, 0.5)',
        direction === 'right' ? '#4CAF50' : '#FF4A4A',
      ]
    );

    return {
      opacity,
      transform: [{ scale }],
      backgroundColor: color,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {direction === 'right' ? (
        <Check size={24} color="white" />
      ) : (
        <X size={24} color="white" />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  right: {
    right: 20,
  },
  left: {
    left: 20,
  },
});
