import { imageLoadTracker } from '../image-load-tracker';
import { Platform } from 'react-native';

const mockMetric = {
  startTime: Date.now(),
  success: true,
  imageUrl: 'https://example.com/image.jpg',
};

describe('ImageLoadTracker', () => {
  beforeEach(() => {
    imageLoadTracker.clearMetrics();
  });

  it('should track image load start', () => {
    imageLoadTracker.startTracking(mockMetric.imageUrl);
    const metrics = imageLoadTracker.getMetrics();
    expect(metrics.get(mockMetric.imageUrl)).toBeDefined();
    expect(metrics.get(mockMetric.imageUrl)?.success).toBe(false);
  });

  it('should track image load end', () => {
    const error = new Error('Test error');

    imageLoadTracker.startTracking(mockMetric.imageUrl);
    imageLoadTracker.endTracking(mockMetric.imageUrl, false, error);

    const metrics = imageLoadTracker.getMetrics();
    const metric = metrics.get(mockMetric.imageUrl);

    expect(metric).toBeDefined();
    expect(metric?.success).toBe(false);
    expect(metric?.error).toBe(error);
    expect(metric?.duration).toBeDefined();
  });

  it('should calculate average load time', () => {
    const url1 = 'https://example.com/image1.jpg';
    const url2 = 'https://example.com/image2.jpg';

    imageLoadTracker.startTracking(url1);
    imageLoadTracker.endTracking(url1, true);

    imageLoadTracker.startTracking(url2);
    imageLoadTracker.endTracking(url2, true);

    const avgTime = imageLoadTracker.getAverageLoadTime();
    expect(avgTime).toBeGreaterThan(0);
  });

  it('should calculate success rate', () => {
    const url1 = 'https://example.com/image1.jpg';
    const url2 = 'https://example.com/image2.jpg';

    imageLoadTracker.startTracking(url1);
    imageLoadTracker.endTracking(url1, true);

    imageLoadTracker.startTracking(url2);
    imageLoadTracker.endTracking(url2, false);

    const successRate = imageLoadTracker.getSuccessRate();
    expect(successRate).toBe(50);
  });

  it('should notify listeners of updates', () => {
    const listener = jest.fn();
    const unsubscribe = imageLoadTracker.addListener(listener);

    imageLoadTracker.startTracking(mockMetric.imageUrl);
    imageLoadTracker.endTracking(mockMetric.imageUrl, true);

    expect(listener).toHaveBeenCalled();
    unsubscribe();
  });
});
