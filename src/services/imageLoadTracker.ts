interface ImageLoadMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  success: boolean;
  error?: Error;
  imageUrl: string;
}

class ImageLoadTracker {
  private static instance: ImageLoadTracker;
  private metrics: Map<string, ImageLoadMetrics> = new Map();
  private listeners: Set<(metrics: ImageLoadMetrics) => void> = new Set();

  private constructor() {}

  public static getInstance(): ImageLoadTracker {
    if (!ImageLoadTracker.instance) {
      ImageLoadTracker.instance = new ImageLoadTracker();
    }
    return ImageLoadTracker.instance;
  }

  public startTracking(imageUrl: string): void {
    this.metrics.set(imageUrl, {
      startTime: Date.now(),
      success: false,
      imageUrl,
    });
  }

  public endTracking(imageUrl: string, success: boolean, error?: Error): void {
    const metric = this.metrics.get(imageUrl);
    if (!metric) return;

    const endTime = Date.now();
    const updatedMetric: ImageLoadMetrics = {
      ...metric,
      endTime,
      duration: endTime - metric.startTime,
      success,
      error,
    };

    this.metrics.set(imageUrl, updatedMetric);
    this.notifyListeners(updatedMetric);
  }

  public getMetrics(): Map<string, ImageLoadMetrics> {
    return new Map(this.metrics);
  }

  public clearMetrics(): void {
    this.metrics.clear();
  }

  public addListener(callback: (metrics: ImageLoadMetrics) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(metrics: ImageLoadMetrics): void {
    this.listeners.forEach(listener => listener(metrics));
  }

  public getAverageLoadTime(): number {
    let totalTime = 0;
    let count = 0;

    this.metrics.forEach(metric => {
      if (metric.duration && metric.success) {
        totalTime += metric.duration;
        count++;
      }
    });

    return count > 0 ? totalTime / count : 0;
  }

  public getSuccessRate(): number {
    let total = 0;
    let success = 0;

    this.metrics.forEach(metric => {
      total++;
      if (metric.success) success++;
    });

    return total > 0 ? (success / total) * 100 : 0;
  }
}

export const imageLoadTracker = ImageLoadTracker.getInstance();
