import { imageLoadTracker } from '../imageLoadTracker';

describe('ImageLoadTracker', () => {
  beforeEach(() => {
    imageLoadTracker.clearMetrics();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('tracks image load time correctly', () => {
    const imageUrl = 'https://example.com/image.jpg';

    imageLoadTracker.startTracking(imageUrl);
    jest.advanceTimersByTime(100); // Simulate 100ms loading time
    imageLoadTracker.endTracking(imageUrl, true);

    const metrics = imageLoadTracker.getMetrics();
    const imageMetrics = metrics.get(imageUrl);

    expect(imageMetrics).toBeDefined();
    expect(imageMetrics?.success).toBe(true);
    expect(imageMetrics?.duration).toBe(100);
  });

  it('tracks multiple images correctly', () => {
    const image1 = 'https://example.com/image1.jpg';
    const image2 = 'https://example.com/image2.jpg';

    imageLoadTracker.startTracking(image1);
    jest.advanceTimersByTime(100);
    imageLoadTracker.endTracking(image1, true);

    imageLoadTracker.startTracking(image2);
    jest.advanceTimersByTime(200);
    imageLoadTracker.endTracking(image2, true);

    const metrics = imageLoadTracker.getMetrics();
    expect(metrics.size).toBe(2);
    expect(metrics.get(image1)?.duration).toBe(100);
    expect(metrics.get(image2)?.duration).toBe(200);
  });

  it('calculates average load time correctly', () => {
    const image1 = 'https://example.com/image1.jpg';
    const image2 = 'https://example.com/image2.jpg';

    imageLoadTracker.startTracking(image1);
    jest.advanceTimersByTime(100);
    imageLoadTracker.endTracking(image1, true);

    imageLoadTracker.startTracking(image2);
    jest.advanceTimersByTime(300);
    imageLoadTracker.endTracking(image2, true);

    expect(imageLoadTracker.getAverageLoadTime()).toBe(200); // (100 + 300) / 2
  });

  it('calculates success rate correctly', () => {
    const image1 = 'https://example.com/image1.jpg';
    const image2 = 'https://example.com/image2.jpg';
    const image3 = 'https://example.com/image3.jpg';

    imageLoadTracker.startTracking(image1);
    imageLoadTracker.endTracking(image1, true);

    imageLoadTracker.startTracking(image2);
    imageLoadTracker.endTracking(image2, false, new Error('Failed to load'));

    imageLoadTracker.startTracking(image3);
    imageLoadTracker.endTracking(image3, true);

    expect(imageLoadTracker.getSuccessRate()).toBe(66.66666666666667); // 2/3 * 100
  });

  it('notifies listeners of metric updates', () => {
    const listener = jest.fn();
    const imageUrl = 'https://example.com/image.jpg';

    const unsubscribe = imageLoadTracker.addListener(listener);

    imageLoadTracker.startTracking(imageUrl);
    jest.advanceTimersByTime(100);
    imageLoadTracker.endTracking(imageUrl, true);

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        imageUrl,
        success: true,
        duration: 100,
      })
    );

    unsubscribe();
  });

  it('clears metrics correctly', () => {
    const imageUrl = 'https://example.com/image.jpg';

    imageLoadTracker.startTracking(imageUrl);
    imageLoadTracker.endTracking(imageUrl, true);

    expect(imageLoadTracker.getMetrics().size).toBe(1);

    imageLoadTracker.clearMetrics();

    expect(imageLoadTracker.getMetrics().size).toBe(0);
    expect(imageLoadTracker.getAverageLoadTime()).toBe(0);
    expect(imageLoadTracker.getSuccessRate()).toBe(0);
  });
});
