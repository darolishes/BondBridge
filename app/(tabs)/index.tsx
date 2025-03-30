import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
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
import { Platform } from 'react-native';
import { useCardStore } from '@/stores/cardStore';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = Math.min(SCREEN_WIDTH * 0.1, 40);

const CARD_COLORS = {
  memories: ['#FF9A9E', '#FAD0C4'],
  emotions: ['#A1C4FD', '#C2E9FB'],
  dreams: ['#D4BFFF', '#E2D1FF'],
  values: ['#88D3BD', '#B8E5D3'],
  challenges: ['#FFB88C', '#FFE2D1'],
  growth: ['#FF9A9E', '#FECFEF'],
};

export default function CardsScreen() {
  const { currentCard, loadCards, nextCard, totalCards, currentCardIndex } = useCardStore();
  const [isLoading, setIsLoading] = useState(true);

  const rotation = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const initialize = async () => {
      await loadCards();
      setIsLoading(false);
      scale.value = withSequence(
        withTiming(1.1, { duration: 200 }),
        withDelay(100, withTiming(1, { duration: 200 }))
      );
    };
    initialize();
  }, [loadCards]);

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
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > 100) {
        offsetX.value = withTiming(event.translationX > 0 ? 500 : -500, {
          duration: 300,
        });
        rotation.value = withTiming((event.translationX > 0 ? 1 : -1) * 30, {
          duration: 300,
        });
        if (Platform.OS !== 'web') {
          // Add visual feedback for web
          const element = document.createElement('div');
          element.style.position = 'fixed';
          element.style.top = '20px';
          element.style.left = '50%';
          element.style.transform = 'translateX(-50%)';
          element.style.padding = '10px 20px';
          element.style.backgroundColor = '#4A90E2';
          element.style.color = 'white';
          element.style.borderRadius = '8px';
          element.style.zIndex = '1000';
          element.textContent = 'Card swiped!';
          document.body.appendChild(element);
          setTimeout(() => element.remove(), 1000);
        }
        setTimeout(() => {
          nextCard();
          offsetX.value = withSpring(0);
          rotation.value = withSpring(0);
          scale.value = withSequence(
            withTiming(1.1, { duration: 200 }),
            withDelay(100, withTiming(1, { duration: 200 }))
          );
        }, 300);
      } else {
        offsetX.value = withSpring(0);
        rotation.value = withSpring(0);
        scale.value = withSpring(1);
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
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800' }}
          style={styles.backgroundImage}
        />
        <BlurView intensity={80} tint="light" style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your journey...</Text>
        </BlurView>
      </View>
    );
  }

  if (!currentCard) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=800' }}
          style={styles.backgroundImage}
        />
        <BlurView intensity={80} tint="light" style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Journey Complete! 🎉</Text>
          <Text style={styles.emptyText}>
            You've explored all the cards in this set. Would you like to start over or try a different
            category?
          </Text>
        </BlurView>
      </View>
    );
  }

  const gradientColors =
    CARD_COLORS[currentCard.category as keyof typeof CARD_COLORS] || ['#FFFFFF', '#F8F8F8'];

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1515266591878-f93e32bc5937?w=800' }}
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
            style={styles.categoryGradient}>
            <Text style={styles.categoryText}>{currentCard.category}</Text>
          </LinearGradient>
        </View>
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}>
            <Text style={styles.questionText}>{currentCard.question}</Text>
            {currentCard.subQuestion && (
              <Text style={styles.subQuestionText}>{currentCard.subQuestion}</Text>
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
  loadingContainer: {
    padding: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  loadingText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#666666',
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