import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useCardStore } from '@/stores/cardStore';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { LoadingScreen } from '@/components/LoadingScreen';
import { SwipeIndicator } from '@/components/SwipeIndicator';
import { RotateCcw, Heart } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { JourneyComplete } from '@/components/JourneyComplete';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = Math.min(SCREEN_WIDTH * 0.1, 40);
const SWIPE_THRESHOLD = 100;

const SPRING_CONFIG = {
  damping: 20,
  mass: 0.8,
  stiffness: 150,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

const CARD_COLORS = {
  memories: ['#FF9A9E', '#FAD0C4'],
  emotions: ['#A1C4FD', '#C2E9FB'],
  dreams: ['#D4BFFF', '#E2D1FF'],
  values: ['#88D3BD', '#B8E5D3'],
  challenges: ['#FFB88C', '#FFE2D1'],
  growth: ['#FF9A9E', '#FECFEF'],
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
    toggleFavorite,
    favoriteCards,
  } = useCardStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Current card animations
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  // Next card animations
  const nextCardTranslateX = useSharedValue(SCREEN_WIDTH);
  const nextCardScale = useSharedValue(0.95);
  const nextCardOpacity = useSharedValue(0);

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadCards();
        setIsLoading(false);
        scale.value = withSpring(1, SPRING_CONFIG);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cards');
        setIsLoading(false);
      }
    };
    initialize();
  }, [loadCards]);

  const resetCardPosition = () => {
    translateX.value = withSpring(0, SPRING_CONFIG);
    translateY.value = withSpring(0, SPRING_CONFIG);
    rotation.value = withSpring(0, SPRING_CONFIG);
    scale.value = withSpring(1, SPRING_CONFIG);
    nextCardTranslateX.value = withSpring(SCREEN_WIDTH, SPRING_CONFIG);
    nextCardScale.value = withSpring(0.95, SPRING_CONFIG);
    nextCardOpacity.value = withTiming(0);
    setSwipeDirection(null);
  };

  const handleSwipeComplete = useCallback((direction: 'left' | 'right') => {
    const targetX = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    
    // Current card exit animation
    translateX.value = withSpring(targetX, {
      ...SPRING_CONFIG,
      velocity: direction === 'right' ? 1000 : -1000,
    });
    rotation.value = withSpring(direction === 'right' ? 30 : -30, SPRING_CONFIG);
    scale.value = withSpring(0.8, SPRING_CONFIG);

    // Next card entrance animation
    nextCardTranslateX.value = direction === 'right' ? -SCREEN_WIDTH : SCREEN_WIDTH;
    nextCardOpacity.value = 1;
    
    setTimeout(() => {
      nextCard(direction);
      resetCardPosition();
    }, 300);
  }, [nextCard]);

  const pan = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.02, SPRING_CONFIG);
    })
    .onChange((event) => {
      // Current card animations with smooth damping
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.2; // Reduce vertical movement
      rotation.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
        [-30, 0, 30],
        Extrapolate.CLAMP
      );

      // Next card animations
      const direction = event.translationX > 0 ? 'right' : 'left';
      const progress = Math.min(Math.abs(event.translationX) / SWIPE_THRESHOLD, 1);
      
      nextCardTranslateX.value = direction === 'right' ? -SCREEN_WIDTH * (1 - progress) : SCREEN_WIDTH * (1 - progress);
      nextCardScale.value = interpolate(progress, [0, 1], [0.95, 1], Extrapolate.CLAMP);
      nextCardOpacity.value = progress;

      setSwipeDirection(Math.abs(event.translationX) > 20 ? direction : null);
    })
    .onEnd((event) => {
      const velocity = event.velocityX;
      const shouldSwipe = Math.abs(event.translationX) > SWIPE_THRESHOLD || Math.abs(velocity) > 800;

      if (shouldSwipe) {
        handleSwipeComplete(event.translationX > 0 ? 'right' : 'left');
      } else {
        resetCardPosition();
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: nextCardTranslateX.value },
      { scale: nextCardScale.value },
    ],
    opacity: nextCardOpacity.value,
    position: 'absolute',
    width: '100%',
    height: '100%',
  }));

  if (isLoading) {
    return <LoadingScreen message="Loading your journey..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800' }}
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
    return <JourneyComplete />;
  }

  const gradientColors =
    CARD_COLORS[currentCard.category as keyof typeof CARD_COLORS] || ['#FFFFFF', '#F8F8F8'];

  const isFavorite = currentCard ? favoriteCards.has(currentCard.id) : false;

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
      
      {canUndo && (
        <TouchableOpacity style={styles.undoButton} onPress={undoLastCard}>
          <RotateCcw size={20} color="#666666" />
          <Text style={styles.undoText}>Undo</Text>
        </TouchableOpacity>
      )}

      <View style={styles.cardContainer}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.cardWrapper, cardStyle]}>
            {swipeDirection === 'left' && (
              <SwipeIndicator direction="left" progress={translateX} />
            )}
            {swipeDirection === 'right' && (
              <SwipeIndicator direction="right" progress={translateX} />
            )}
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => currentCard && toggleFavorite(currentCard.id)}>
                <Heart
                  size={24}
                  color={isFavorite ? '#FF4A4A' : '#666666'}
                  fill={isFavorite ? '#FF4A4A' : 'none'}
                />
              </TouchableOpacity>
              <Text style={styles.questionText}>{currentCard.question}</Text>
              {currentCard.subQuestion && (
                <Text style={styles.subQuestionText}>{currentCard.subQuestion}</Text>
              )}
            </LinearGradient>
          </Animated.View>
        </GestureDetector>

        <Animated.View style={nextCardStyle}>
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
      </View>

      <BlurView intensity={80} tint="light" style={styles.hintContainer}>
        <Text style={styles.hint}>Swipe right to keep • Swipe left to skip</Text>
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
    height: 300,
    paddingHorizontal: CARD_MARGIN,
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
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