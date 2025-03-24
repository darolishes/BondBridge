import { renderHook, act } from '@testing-library/react-hooks';
import * as Haptics from 'expo-haptics';
import { useHapticFeedback } from '../useHapticFeedback';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

describe('useHapticFeedback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default config', () => {
    const { result } = renderHook(() => useHapticFeedback());
    expect(result.current.isEnabled).toBe(true);
  });

  it('initializes with custom config', () => {
    const { result } = renderHook(() => useHapticFeedback({ enabled: false }));
    expect(result.current.isEnabled).toBe(false);
  });

  it('enables and disables haptic feedback', () => {
    const { result } = renderHook(() => useHapticFeedback({ enabled: false }));

    act(() => {
      result.current.enable();
    });
    expect(result.current.isEnabled).toBe(true);

    act(() => {
      result.current.disable();
    });
    expect(result.current.isEnabled).toBe(false);
  });

  it('triggers impact feedback', async () => {
    const { result } = renderHook(() => useHapticFeedback());

    await act(async () => {
      await result.current.trigger('light');
    });
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);

    await act(async () => {
      await result.current.trigger('medium');
    });
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);

    await act(async () => {
      await result.current.trigger('heavy');
    });
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
  });

  it('triggers notification feedback', async () => {
    const { result } = renderHook(() => useHapticFeedback());

    await act(async () => {
      await result.current.trigger('success');
    });
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Success
    );

    await act(async () => {
      await result.current.trigger('warning');
    });
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Warning
    );

    await act(async () => {
      await result.current.trigger('error');
    });
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(Haptics.NotificationFeedbackType.Error);
  });

  it('does not trigger feedback when disabled', async () => {
    const { result } = renderHook(() => useHapticFeedback({ enabled: false }));

    await act(async () => {
      await result.current.trigger('medium');
    });
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
    expect(Haptics.notificationAsync).not.toHaveBeenCalled();
  });

  it('handles errors gracefully', async () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const error = new Error('Haptic feedback failed');
    (Haptics.impactAsync as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useHapticFeedback());

    await act(async () => {
      await result.current.trigger('medium');
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith('Haptic feedback failed:', error);
    consoleWarnSpy.mockRestore();
  });
});
