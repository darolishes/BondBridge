import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface LoadingScreenProps {
  message?: string;
}

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  const spinStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withRepeat(
            withTiming('360deg', { duration: 1500 }),
            -1,
            false
          ),
        },
      ],
    };
  });

  return (
    <BlurView intensity={80} tint="light" style={styles.container}>
      <AnimatedIonicons 
        name="reload-outline" 
        size={48} 
        color="#4A90E2" 
        style={spinStyle} 
      />
      <Text style={styles.message}>{message}</Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#666666',
    marginTop: 16,
  },
});
