import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

export type HapticPattern =
  | "success"
  | "warning"
  | "error"
  | "light"
  | "medium"
  | "heavy";

interface HapticPatterns {
  success: [number, number][];
  warning: [number, number][];
  error: [number, number][];
  light: [number, number][];
  medium: [number, number][];
  heavy: [number, number][];
}

const VIBRATION_PATTERNS: HapticPatterns = {
  success: [[50, 0]],
  warning: [
    [30, 50],
    [30, 0],
  ],
  error: [
    [40, 30],
    [40, 30],
    [40, 0],
  ],
  light: [[10, 0]],
  medium: [[20, 0]],
  heavy: [[30, 0]],
};

class HapticService {
  private static instance: HapticService;
  private isHapticsEnabled: boolean = true;
  private lastHapticTime: number = 0;
  private readonly HAPTIC_THROTTLE = 100; // ms

  private constructor() {
    // Singleton-Pattern
  }

  public static getInstance(): HapticService {
    if (!HapticService.instance) {
      HapticService.instance = new HapticService();
    }
    return HapticService.instance;
  }

  public setEnabled(enabled: boolean): void {
    this.isHapticsEnabled = enabled;
  }

  public async trigger(pattern: HapticPattern): Promise<void> {
    if (!this.isHapticsEnabled) return;

    const now = Date.now();
    if (now - this.lastHapticTime < this.HAPTIC_THROTTLE) return;
    this.lastHapticTime = now;

    if (Platform.OS === "web") {
      await this.triggerWebHaptics(pattern);
    } else {
      await this.triggerNativeHaptics(pattern);
    }
  }

  private async triggerWebHaptics(pattern: HapticPattern): Promise<void> {
    if (!navigator.vibrate) return;

    const vibrationPattern = VIBRATION_PATTERNS[pattern].flat();
    navigator.vibrate(vibrationPattern);
  }

  private async triggerNativeHaptics(pattern: HapticPattern): Promise<void> {
    try {
      switch (pattern) {
        case "success":
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
          break;
        case "warning":
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Warning
          );
          break;
        case "error":
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
          );
          break;
        case "light":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case "medium":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case "heavy":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
      }
    } catch (error) {
      console.warn("Haptics nicht verfügbar:", error);
    }
  }

  public async impact(style: "light" | "medium" | "heavy"): Promise<void> {
    await this.trigger(style);
  }

  public async notification(
    type: "success" | "warning" | "error"
  ): Promise<void> {
    await this.trigger(type);
  }

  // Utility-Methoden für häufige Anwendungsfälle
  public async swipeProgress(progress: number): Promise<void> {
    if (progress > 0.8) {
      await this.impact("heavy");
    } else if (progress > 0.5) {
      await this.impact("medium");
    } else if (progress > 0.2) {
      await this.impact("light");
    }
  }

  public async swipeComplete(success: boolean): Promise<void> {
    await this.notification(success ? "success" : "error");
  }
}

// Exportiere eine Singleton-Instanz
export const haptics = HapticService.getInstance();
