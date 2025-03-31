import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useCardStore } from '@/stores/cardStore';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { LoadingScreen } from '@/components/LoadingScreen';
import { SwipeIndicator } from '@/components/SwipeIndicator';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = Math.min(SCREEN_WIDTH * 0.1, 40);
const SWIPE_THRESHOLD = 100;

const CARD_COLORS = {
  memories: ['#FF9A9E', '#FAD0C4'] as readonly [string, string],
  emotions: ['#A1C4FD', '#C2E9FB'] as readonly [string, string],
  dreams: ['#D4BFFF', '#E2D1FF'] as readonly [string, string],
  values: ['#88D3BD', '#B8E5D3'] as readonly [string, string],
  challenges: ['#FFB88C', '#FFE2D1'] as readonly [string, string],
  growth: ['#FF9A9E', '#FECFEF'] as readonly [string, string],
};

export default function CardsScreen() {
  const {
    currentCard,
    loadCards,
    nextCard,
    totalCards,
    currentCardIndex,
    canUndo,
    undoLastCard,
  } = useCardStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null
  );

  const rotation = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadCards();
        setIsLoading(false);
        scale.value = withSequence(
          withTiming(1.1, { duration: 200 }),
          withDelay(100, withTiming(1, { duration: 200 }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cards');
        setIsLoading(false);
      }
    };
    initialize();
  }, [loadCards]);

  const handleSwipeComplete = useCallback(
    (direction: 'left' | 'right') => {
      offsetX.value = withTiming(direction === 'right' ? 500 : -500, {
        duration: 300,
      });
      rotation.value = withTiming((direction === 'right' ? 1 : -1) * 30, {
        duration: 300,
      });

      setTimeout(() => {
        nextCard(direction);
        offsetX.value = withSpring(0);
        rotation.value = withSpring(0);
        scale.value = withSequence(
          withTiming(1.1, { duration: 200 }),
          withDelay(100, withTiming(1, { duration: 200 }))
        );
        setSwipeDirection(null);
      }, 300);
    },
    [nextCard]
  );

  const pan = Gesture.Pan()
    .onChange((event) => {
      offsetX.value = event.translationX;
      rotation.value = (event.translationX / 200) * 8;
      scale.value = interpolate(
        Math.abs(event.translationX),
        [0, 100],
        [1, 0.95],
        Extrapolate.CLAMP
      );
      setSwipeDirection(event.translationX > 0 ? 'right' : 'left');
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        handleSwipeComplete(event.translationX > 0 ? 'right' : 'left');
      } else {
        offsetX.value = withSpring(0);
        rotation.value = withSpring(0);
        scale.value = withSpring(1);
        setSwipeDirection(null);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  if (isLoading) {
    return <LoadingScreen message="Loading your journey..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800',
          }}
          style={styles.backgroundImage}
        />
        <BlurView intensity={80} tint="light" style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorText}>{error}</Text>
        </BlurView>
      </View>
    );
  }

  if (!currentCard) {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=800',
          }}
          style={styles.backgroundImage}
        />
        <BlurView intensity={80} tint="light" style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Journey Complete! 🎉</Text>
          <Text style={styles.emptyText}>
            You've explored all the cards in this set. Would you like to start
            over or try a different category?
          </Text>
        </BlurView>
      </View>
    );
  }

  const gradientColors =
    CARD_COLORS[currentCard.category as keyof typeof CARD_COLORS] ||
    (['#FFFFFF', '#F8F8F8'] as readonly [string, string]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1515266591878-f93e32bc5937?w=800',
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.header}>
        <Text style={styles.progress}>
          {currentCardIndex + 1} / {totalCards}
        </Text>
        <View style={styles.category}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.categoryGradient}
          >
            <Text style={styles.categoryText}>{currentCard.category}</Text>
          </LinearGradient>
        </View>
      </View>

      {canUndo && (
        // In the render method, replace:
        <TouchableOpacity style={styles.undoButton} onPress={undoLastCard}>
          <Ionicons name="arrow-undo-outline" size={20} color="#666666" />
          <Text style={styles.undoText}>Undo</Text>
        </TouchableOpacity>
      )}

      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          {swipeDirection === 'left' && (
            <SwipeIndicator direction="left" progress={offsetX} />
          )}
          {swipeDirection === 'right' && (
            <SwipeIndicator direction="right" progress={offsetX} />
          )}
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.questionText}>{currentCard.question}</Text>
            {currentCard.subQuestion && (
              <Text style={styles.subQuestionText}>
                {currentCard.subQuestion}
              </Text>
            )}
          </LinearGradient>
        </Animated.View>
      </GestureDetector>

      <BlurView intensity={80} tint="light" style={styles.hintContainer}>
        <Text style={styles.hint}>Swipe left or right to continue</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 40 : 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CARD_MARGIN,
  },
  progress: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#666666',
  },
  category: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  categoryGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#333333',
    textTransform: 'capitalize',
  },
  undoButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 40 : 60,
    left: '50%',
    transform: [{ translateX: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  undoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: CARD_MARGIN,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    minHeight: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#333333',
    marginBottom: 16,
    lineHeight: 32,
  },
  subQuestionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  errorContainer: {
    padding: 32,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },
  errorTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#FF4A4A',
    marginBottom: 8,
  },
  errorText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    borderRadius: 24,
    maxWidth: 400,
    margin: CARD_MARGIN,
    overflow: 'hidden',
  },
  emptyTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  hintContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 80 : 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  hint: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666666',
    opacity: 0.8,
  },
});
