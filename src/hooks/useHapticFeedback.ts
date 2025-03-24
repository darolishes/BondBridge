import { useCallback, useState } from 'react';
import * as Haptics from 'expo-haptics';

export type HapticFeedbackType = 'success' | 'error' | 'warning' | 'light' | 'medium' | 'heavy';

export interface UseHapticFeedbackConfig {
  /** Whether haptic feedback is enabled */
  enabled?: boolean;
  /** Default feedback type */
  defaultType?: HapticFeedbackType;
}

export interface UseHapticFeedbackResult {
  /** Trigger haptic feedback */
  trigger: (type?: HapticFeedbackType) => Promise<void>;
  /** Enable haptic feedback */
  enable: () => void;
  /** Disable haptic feedback */
  disable: () => void;
  /** Whether haptic feedback is enabled */
  isEnabled: boolean;
}

const DEFAULT_CONFIG: Required<UseHapticFeedbackConfig> = {
  enabled: true,
  defaultType: 'medium',
};

/**
 * Hook for managing haptic feedback
 * @param config Configuration options for haptic feedback
 * @returns Object containing haptic feedback controls
 */
export const useHapticFeedback = (config?: UseHapticFeedbackConfig): UseHapticFeedbackResult => {
  const { enabled: initialEnabled, defaultType } = { ...DEFAULT_CONFIG, ...config };
  const [isEnabled, setIsEnabled] = useState(initialEnabled);

  /**
   * Trigger haptic feedback
   */
  const trigger = useCallback(
    async (type: HapticFeedbackType = defaultType) => {
      if (!isEnabled) return;

      try {
        switch (type) {
          case 'success':
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            break;
          case 'error':
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            break;
          case 'warning':
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            break;
          case 'light':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
          case 'medium':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;
          case 'heavy':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            break;
          default:
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      } catch (error) {
        console.warn('Haptic feedback failed:', error);
      }
    },
    [isEnabled, defaultType]
  );

  /**
   * Enable haptic feedback
   */
  const enable = useCallback(() => {
    setIsEnabled(true);
  }, []);

  /**
   * Disable haptic feedback
   */
  const disable = useCallback(() => {
    setIsEnabled(false);
  }, []);

  return {
    trigger,
    enable,
    disable,
    isEnabled,
  };
};

export default useHapticFeedback;
