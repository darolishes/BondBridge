import { renderHook, act } from '@testing-library/react-hooks';
import { useCardSwipe } from '../useCardSwipe';
import { GestureResponderEvent, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const createMockGestureEvent = (): NativeSyntheticEvent<NativeTouchEvent> =>
  ({
    nativeEvent: {
      changedTouches: [],
      identifier: '1',
      locationX: 0,
      locationY: 0,
      pageX: 0,
      pageY: 0,
      target: 0,
      timestamp: 0,
      touches: [],
    },
    currentTarget: 0,
    target: 0,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    preventDefault: () => {},
    isDefaultPrevented: () => false,
    stopPropagation: () => {},
    isPropagationStopped: () => false,
    persist: () => {},
    timeStamp: 0,
    type: '',
  } as NativeSyntheticEvent<NativeTouchEvent>);

describe('useCardSwipe', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useCardSwipe());

    expect(result.current.panResponder).toBeDefined();
    expect(result.current.swipeAnim).toBeDefined();
    expect(result.current.swipeDirection).toBeNull();
    expect(typeof result.current.resetPosition).toBe('function');
    expect(result.current.cardStyle).toBeDefined();
  });

  it('provides swipe animation values', () => {
    const { result } = renderHook(() => useCardSwipe());
    const { swipeAnim } = result.current;

    expect(swipeAnim.translateX).toBeDefined();
    expect(swipeAnim.translateY).toBeDefined();
    expect(swipeAnim.rotate).toBeDefined();
  });

  it('provides animated card style', () => {
    const { result } = renderHook(() => useCardSwipe());
    const { cardStyle } = result.current;

    expect(cardStyle).toBeDefined();
    expect(cardStyle.transform).toBeDefined();
  });

  it('accepts custom configuration', () => {
    const config = {
      swipeThreshold: 200,
      rotationFactor: 10,
      enableVerticalSwipe: true,
    };

    const { result } = renderHook(() => useCardSwipe(config));
    expect(result.current.panResponder).toBeDefined();
  });

  it('provides reset position functionality', () => {
    const { result } = renderHook(() => useCardSwipe());

    expect(() => {
      act(() => {
        result.current.resetPosition();
      });
    }).not.toThrow();
  });

  it('handles swipe callbacks', () => {
    const onSwipeLeft = jest.fn();
    const onSwipeRight = jest.fn();

    renderHook(() => useCardSwipe({ onSwipeLeft, onSwipeRight }));

    expect(onSwipeLeft).not.toHaveBeenCalled();
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  it('handles swipe left gesture', () => {
    const onSwipeLeft = jest.fn();
    const { result } = renderHook(() => useCardSwipe({ onSwipeLeft }));

    const mockEvent = createMockGestureEvent();
    const gestureState = { dx: -150, dy: 0 };

    act(() => {
      // @ts-ignore - Private API access for testing
      result.current.panResponder.panHandlers._onPanResponderMove(mockEvent, gestureState);
    });

    expect(result.current.swipeDirection).toBe('left');
  });

  it('handles swipe right gesture', () => {
    const onSwipeRight = jest.fn();
    const { result } = renderHook(() => useCardSwipe({ onSwipeRight }));

    const mockEvent = createMockGestureEvent();
    const gestureState = { dx: 150, dy: 0 };

    act(() => {
      // @ts-ignore - Private API access for testing
      result.current.panResponder.panHandlers._onPanResponderMove(mockEvent, gestureState);
    });

    expect(result.current.swipeDirection).toBe('right');
  });

  it('handles vertical swipe when enabled', () => {
    const { result } = renderHook(() => useCardSwipe({ enableVerticalSwipe: true }));

    const mockEvent = createMockGestureEvent();
    const gestureState = { dx: 0, dy: 150 };

    act(() => {
      // @ts-ignore - Private API access for testing
      result.current.panResponder.panHandlers._onPanResponderMove(mockEvent, gestureState);
    });

    expect(result.current.swipeDirection).toBe('down');
  });

  it('ignores vertical swipe when disabled', () => {
    const { result } = renderHook(() => useCardSwipe({ enableVerticalSwipe: false }));

    const mockEvent = createMockGestureEvent();
    const gestureState = { dx: 0, dy: 150 };

    act(() => {
      // @ts-ignore - Private API access for testing
      result.current.panResponder.panHandlers._onPanResponderMove(mockEvent, gestureState);
    });

    expect(result.current.swipeDirection).toBeNull();
  });

  it('resets position correctly', () => {
    const { result } = renderHook(() => useCardSwipe());

    const mockEvent = createMockGestureEvent();
    const gestureState = { dx: 150, dy: 0 };

    act(() => {
      // @ts-ignore - Private API access for testing
      result.current.panResponder.panHandlers._onPanResponderMove(mockEvent, gestureState);
    });

    expect(result.current.swipeDirection).toBe('right');

    act(() => {
      result.current.resetPosition();
    });

    expect(result.current.swipeDirection).toBeNull();
  });

  it('calls swipe callbacks when threshold is exceeded', () => {
    const onSwipeLeft = jest.fn();
    const onSwipeRight = jest.fn();
    const { result } = renderHook(() =>
      useCardSwipe({
        onSwipeLeft,
        onSwipeRight,
        swipeThreshold: 100,
      })
    );

    const mockEvent = createMockGestureEvent();
    const leftGestureState = { dx: -150, dy: 0, vx: 0, vy: 0 };
    const rightGestureState = { dx: 150, dy: 0, vx: 0, vy: 0 };

    act(() => {
      // @ts-ignore - Private API access for testing
      result.current.panResponder.panHandlers._onPanResponderRelease(mockEvent, leftGestureState);
    });

    expect(onSwipeLeft).toHaveBeenCalled();
    expect(onSwipeRight).not.toHaveBeenCalled();

    act(() => {
      // @ts-ignore - Private API access for testing
      result.current.panResponder.panHandlers._onPanResponderRelease(mockEvent, rightGestureState);
    });

    expect(onSwipeRight).toHaveBeenCalled();
  });

  it('creates correct animated styles', () => {
    const { result } = renderHook(() => useCardSwipe());
    const { transform } = result.current.cardStyle;

    expect(transform).toBeDefined();
    expect(Array.isArray(transform)).toBe(true);
    expect(transform?.length).toBe(3);

    const [translateX, translateY, rotate] = transform || [];
    expect(translateX).toHaveProperty('translateX');
    expect(translateY).toHaveProperty('translateY');
    expect(rotate).toHaveProperty('rotate');
  });
});
