import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useCardStore } from '@/stores/cardStore';
import { RefreshCw, Share2 } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function JourneyComplete() {
  const { resetProgress, journeyCompletions } = useCardStore();
  const latestJourney = journeyCompletions[journeyCompletions.length - 1];

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSequence(
          withDelay(500, withSpring(1.1)),
          withSpring(1)
        ),
      },
    ],
  }));

  return (
    <BlurView intensity={80} tint="light" style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Journey Complete! 🎉</Text>
        <Text style={styles.subtitle}>
          You've explored all the cards in this set. What would you like to do next?
        </Text>

        <AnimatedTouchable
          style={[styles.primaryButton, buttonStyle]}
          onPress={resetProgress}>
          <RefreshCw size={24} color="white" />
          <Text style={styles.primaryButtonText}>Start New Journey</Text>
        </AnimatedTouchable>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => latestJourney && useCardStore.getState().shareJourney(latestJourney.id)}>
          <Share2 size={24} color="#4A90E2" />
          <Text style={styles.secondaryButtonText}>Share This Journey</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    fontFamily: 'Roboto-Bold',
    color: 'white',
    fontSize: 18,
    marginLeft: 12,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4A90E2',
    width: '100%',
  },
  secondaryButtonText: {
    fontFamily: 'Roboto-Regular',
    color: '#4A90E2',
    fontSize: 18,
    marginLeft: 12,
  },
});