import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ImageCategories, imageService } from '../services/imageService';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';
import { imageLoadTracker } from '../services/imageLoadTracker';

interface PerformanceStats {
  averageLoadTime: number;
  successRate: number;
}

export const CardSetImageGrid = () => {
  const [stats, setStats] = useState<PerformanceStats>({
    averageLoadTime: 0,
    successRate: 100,
  });

  useEffect(() => {
    const updateStats = () => {
      setStats({
        averageLoadTime: imageLoadTracker.getAverageLoadTime(),
        successRate: imageLoadTracker.getSuccessRate(),
      });
    };

    const unsubscribe = imageLoadTracker.addListener(updateStats);
    return () => {
      unsubscribe();
      imageLoadTracker.clearMetrics();
    };
  }, []);

  const handleLoadStart = (imageUrl: string) => {
    imageLoadTracker.startTracking(imageUrl);
  };

  const handleLoadEnd = (imageUrl: string) => {
    imageLoadTracker.endTracking(imageUrl, true);
  };

  const handleError = (imageUrl: string, error: Error) => {
    imageLoadTracker.endTracking(imageUrl, false, error);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Average Load Time: {stats.averageLoadTime.toFixed(0)}ms
        </Text>
        <Text style={styles.statsText}>Success Rate: {stats.successRate.toFixed(1)}%</Text>
      </View>

      {Object.values(ImageCategories).map(category => (
        <View key={category} style={styles.imageContainer}>
          <Text style={styles.categoryText}>{category}</Text>
          <View style={styles.imageWrapper}>
            <ImageWithPlaceholder
              source={imageService.getDefaultImage(category)}
              style={styles.image}
              resizeMode="cover"
              onLoadStart={() => handleLoadStart(`${category}-full`)}
              onLoadEnd={() => handleLoadEnd(`${category}-full`)}
              onError={error => handleError(`${category}-full`, error)}
            />
          </View>
          <View style={styles.thumbnailWrapper}>
            <ImageWithPlaceholder
              source={imageService.getThumbnailImage(category)}
              style={styles.thumbnail}
              resizeMode="cover"
              onLoadStart={() => handleLoadStart(`${category}-thumb`)}
              onLoadEnd={() => handleLoadEnd(`${category}-thumb`)}
              onError={error => handleError(`${category}-thumb`, error)}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  statsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  imageContainer: {
    margin: 10,
    alignItems: 'center',
  },
  categoryText: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
  thumbnailWrapper: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
});
