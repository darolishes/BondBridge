import { InteractionManager } from "react-native";

interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  lastUpdate: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    fps: 60,
    renderTime: 0,
    lastUpdate: Date.now(),
  };

  private frameCount: number = 0;
  private lastFrameTimestamp: number = 0;
  private isTracking: boolean = false;

  private constructor() {
    // Private constructor für Singleton-Pattern
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public startTracking(): void {
    if (this.isTracking) return;

    this.isTracking = true;
    this.lastFrameTimestamp = performance.now();
    this.frameCount = 0;

    requestAnimationFrame(this.trackFrame);
  }

  public stopTracking(): void {
    this.isTracking = false;
  }

  private trackFrame = () => {
    if (!this.isTracking) return;

    const now = performance.now();
    const timeDiff = now - this.lastFrameTimestamp;

    // Frame-Zählung
    this.frameCount++;

    // FPS-Berechnung alle 1000ms
    if (timeDiff >= 1000) {
      const fps = Math.round((this.frameCount * 1000) / timeDiff);

      InteractionManager.runAfterInteractions(() => {
        this.metrics = {
          ...this.metrics,
          fps,
          lastUpdate: Date.now(),
        };
      });

      this.frameCount = 0;
      this.lastFrameTimestamp = now;
    }

    requestAnimationFrame(this.trackFrame);
  };

  public trackRenderTime(startTime: number): void {
    const renderTime = performance.now() - startTime;

    InteractionManager.runAfterInteractions(() => {
      this.metrics = {
        ...this.metrics,
        renderTime,
        lastUpdate: Date.now(),
      };
    });
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public reset(): void {
    this.metrics = {
      fps: 60,
      renderTime: 0,
      lastUpdate: Date.now(),
    };
    this.frameCount = 0;
    this.lastFrameTimestamp = 0;
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
export type { PerformanceMetrics };
