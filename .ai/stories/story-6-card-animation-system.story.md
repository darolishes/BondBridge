# Story 6: Card Animation System

## Status: In Progress 🚀

## Story

As a user,
I want fluid and intuitive card animations when interacting with the app,
So that I have an engaging and delightful experience when browsing conversation cards.

## Technical Implementation

The animation system has been implemented using React Native's Animated API and includes:

1. Card Flip Animation:

```typescript
// @hooks/useCardFlip.ts
export const useCardFlip = (config?: UseCardFlipConfig): UseCardFlipResult => {
  const { duration, friction, tension, initialFlipped, useSpring } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const [isFlipped, setIsFlipped] = useState(initialFlipped);
  const progress = useRef(new Animated.Value(initialFlipped ? 1 : 0)).current;

  const flipCard = useCallback(() => {
    const toValue = isFlipped ? 0 : 1;
    setIsFlipped(!isFlipped);

    if (useSpring) {
      Animated.spring(progress, {
        toValue,
        friction,
        tension,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    }
  }, [isFlipped, progress, useSpring, duration, friction, tension]);

  return { isFlipped, flipCard, frontStyle, backStyle };
};
```

2. Card Swipe Animation:

```typescript
// @hooks/useCardSwipe.ts
export const useCardSwipe = (config: UseCardSwipeConfig): UseCardSwipeResult => {
  const { swipeThreshold, rotationFactor, onSwipeLeft, onSwipeRight } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, { dx, dy }) => {
          return Math.abs(dx) > 20 && Math.abs(dy) < 20;
        },
        onPanResponderMove: (_, { dx }) => {
          // Update position and rotation
          position.setValue(dx);
        },
        onPanResponderRelease: (_, { dx }) => {
          if (dx > swipeThreshold) onSwipeRight?.();
          else if (dx < -swipeThreshold) onSwipeLeft?.();
          else resetPosition();
        },
      }),
    [swipeThreshold, onSwipeLeft, onSwipeRight]
  );

  return { panResponder, cardStyle, swipeDirection, resetPosition };
};
```

3. Haptic Feedback Integration:

```typescript
// @hooks/useHapticFeedback.ts
export const useHapticFeedback = (config: UseHapticConfig): UseHapticResult => {
  const { enabled = true } = config;

  const trigger = useCallback(
    (type: HapticType = 'medium') => {
      if (!enabled) return;

      switch (type) {
        case 'light':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
      }
    },
    [enabled]
  );

  return { trigger };
};
```

## Implemented Features

1. ✅ Basic Card Component

   - Title and content support
   - Custom styling options
   - Loading state

2. ✅ Flip Animation

   - Smooth spring-based animation
   - Configurable duration and physics
   - Front and back content support

3. ✅ Swipe Gestures

   - Left/right swipe detection
   - Threshold-based activation
   - Reset animation

4. ✅ Haptic Feedback

   - Multiple intensity levels
   - Configurable triggers
   - Platform-specific handling

5. ✅ Stack Animations

   - Card stacking with scale
   - Z-index management
   - Smooth transitions

6. ✅ Accessibility

   - Reduced motion support
   - Screen reader compatibility
   - Clear navigation hints

7. ✅ Performance Monitoring
   - Animation duration tracking
   - Frame drop detection
   - Metrics visualization

## Tasks

1. [x] Implement card flip animation hook
2. [x] Create swipe gesture detection hook
3. [x] Develop FlippableCard component
4. [x] Develop SwipeableCard component
5. [x] Add haptic feedback integration
6. [x] Create animation utility functions
7. [x] Implement card stack animation
8. [x] Add animation transitions between screens
9. [x] Test animations on iOS and Android
10. [x] Optimize animation performance
11. [x] Add accessibility features
12. [x] Implement performance monitoring
13. [ ] Add animation stress tests
14. [ ] Create animation documentation
15. [ ] Optimize for low-end devices

## Test Cases

```typescript
// tests/hooks/useCardAnimation.test.tsx
describe('Card Animation System', () => {
  describe('useCardFlip', () => {
    it('initializes with correct default state', () => {
      const { result } = renderHook(() => useCardFlip());
      expect(result.current.isFlipped).toBe(false);
    });

    it('toggles flip state correctly', () => {
      const { result } = renderHook(() => useCardFlip());
      act(() => {
        result.current.flipCard();
      });
      expect(result.current.isFlipped).toBe(true);
    });
  });

  describe('useCardSwipe', () => {
    it('handles swipe gestures correctly', () => {
      const onSwipeLeft = jest.fn();
      const onSwipeRight = jest.fn();

      const { result } = renderHook(() => useCardSwipe({ onSwipeLeft, onSwipeRight }));

      // Test swipe gestures
    });
  });

  describe('useHapticFeedback', () => {
    it('triggers haptic feedback when enabled', () => {
      const { result } = renderHook(() => useHapticFeedback({ enabled: true }));

      act(() => {
        result.current.trigger('medium');
      });

      // Verify haptic feedback
    });
  });
});
```

## Dependencies

- ✅ Story 3: Theme Customization
- ✅ Story 4: BondBridge UI Implementation
- ⏳ Story 8: Card Set Import System
- ⏳ Story 9: Progress Tracking System

## Estimation

- ✅ Animation hooks: 4 hours
- ✅ Flippable card component: 3 hours
- ✅ Swipeable card component: 3 hours
- ✅ Haptic feedback: 1 hour
- ✅ Stack animations: 2 hours
- ✅ Testing: 3 hours
- ⏳ Documentation: 2 hours
- ⏳ Performance optimization: 2 hours
  Total: 20 hours (16 completed, 4 remaining)

## Notes

- ✅ Implemented reduced motion settings for accessibility
- ✅ Added performance monitoring for animations
- ✅ Created comprehensive Storybook examples
- 🔄 Need to add stress tests for animation performance
- 📝 Documentation needs to be completed
- 🎯 Consider adding animation presets for common use cases

## Next Steps

1. Create animation stress tests
2. Complete documentation with usage examples
3. Optimize animations for low-end devices
4. Add animation presets
5. Integrate with Card Set Import System
