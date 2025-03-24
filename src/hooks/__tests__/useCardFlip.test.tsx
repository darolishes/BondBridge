import { renderHook, act } from '@testing-library/react-hooks';
import { useCardFlip } from '../useCardFlip';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('useCardFlip', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useCardFlip());

    expect(result.current.isFlipped).toBe(false);
    expect(result.current.progress).toBeDefined();
    expect(result.current.frontStyle).toBeDefined();
    expect(result.current.backStyle).toBeDefined();
    expect(typeof result.current.flipCard).toBe('function');
  });

  it('initializes with custom initial flipped state', () => {
    const { result } = renderHook(() => useCardFlip({ initialFlipped: true }));
    expect(result.current.isFlipped).toBe(true);
  });

  it('toggles flip state when flipCard is called', () => {
    const { result } = renderHook(() => useCardFlip());

    act(() => {
      result.current.flipCard();
    });

    expect(result.current.isFlipped).toBe(true);

    act(() => {
      result.current.flipCard();
    });

    expect(result.current.isFlipped).toBe(false);
  });

  it('updates styles based on flip state', () => {
    const { result } = renderHook(() => useCardFlip());

    const initialFrontZIndex = result.current.frontStyle.zIndex;
    const initialBackZIndex = result.current.backStyle.zIndex;

    act(() => {
      result.current.flipCard();
    });

    expect(result.current.frontStyle.zIndex).toBe(initialBackZIndex);
    expect(result.current.backStyle.zIndex).toBe(initialFrontZIndex);
  });

  it('uses spring animation by default', () => {
    const { result } = renderHook(() => useCardFlip());

    const animationSpy = jest.spyOn(result.current.progress, 'setValue');

    act(() => {
      result.current.flipCard();
    });

    expect(animationSpy).toHaveBeenCalled();
    animationSpy.mockRestore();
  });

  it('uses timing animation when useSpring is false', () => {
    const { result } = renderHook(() => useCardFlip({ useSpring: false }));

    const animationSpy = jest.spyOn(result.current.progress, 'setValue');

    act(() => {
      result.current.flipCard();
    });

    expect(animationSpy).toHaveBeenCalled();
    animationSpy.mockRestore();
  });

  it('maintains consistent transform properties', () => {
    const { result } = renderHook(() => useCardFlip());

    expect(result.current.frontStyle.transform).toHaveLength(2);
    expect(result.current.backStyle.transform).toHaveLength(2);
    expect(result.current.frontStyle.transform[0]).toHaveProperty('perspective');
    expect(result.current.frontStyle.transform[1]).toHaveProperty('rotateY');
  });
});
