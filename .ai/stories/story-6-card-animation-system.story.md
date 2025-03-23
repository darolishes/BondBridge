# Story 6: Card Animation System

## Status: Draft 📝

## Story

As a user,
I want fluid and intuitive card animations when interacting with the app,
So that I have an engaging and delightful experience when browsing conversation cards.

## Technical Implementation

The animation system will be implemented using React Native's Animated API and will include:

1. Card Flip Animation:

```typescript
// @hooks/useCardAnimation.ts
export const useCardFlip = (initialState = false) => {
  const [isFlipped, setIsFlipped] = useState(initialState);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, flipAnim]);

  return { isFlipped, flipCard, frontAnimatedStyle, backAnimatedStyle };
};
```

2. Card Swipe Animation:

```typescript
// @hooks/useCardSwipe.ts
export const useCardSwipe = ({ onSwipeLeft, onSwipeRight }) => {
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, { dx, dy }) => {
          return Math.abs(dx) > 20 && Math.abs(dy) < 20;
        },
        onPanResponderRelease: (_, { dx }) => {
          if (dx > 120) onSwipeRight?.();
          else if (dx < -120) onSwipeLeft?.();
        },
      }),
    [onSwipeLeft, onSwipeRight]
  );

  return { panResponder };
};
```

## Tasks

1. [ ] Implement card flip animation hook
2. [ ] Create swipe gesture detection hook
3. [ ] Develop FlippableCard component
4. [ ] Develop SwipeableCard component
5. [ ] Add haptic feedback integration
6. [ ] Create animation utility functions
7. [ ] Implement card stack animation
8. [ ] Add animation transitions between screens
9. [ ] Test animations on iOS and Android
10. [ ] Optimize animation performance

## Test Cases

```typescript
// tests/hooks/useCardFlip.test.tsx
describe("useCardFlip", () => {
  it("initializes with correct default state", () => {
    const { result } = renderHook(() => useCardFlip());
    expect(result.current.isFlipped).toBe(false);
  });

  it("toggles flip state correctly", () => {
    const { result } = renderHook(() => useCardFlip());
    act(() => {
      result.current.flipCard();
    });
    expect(result.current.isFlipped).toBe(true);
  });
});
```

## Dependencies

- Story 3: Theme Customization
- Story 4: BondBridge UI Implementation

## Estimation

- Animation hooks: 4 hours
- Flippable card component: 3 hours
- Swipeable card component: 3 hours
- Haptic feedback: 1 hour
- Stack animations: 2 hours
- Testing: 3 hours
  Total: 16 hours

## Notes

- Consider reduced motion settings for accessibility
- Ensure animations work well on lower-end devices
- Document animation API for reuse in other components
- Add performance monitoring for animations
