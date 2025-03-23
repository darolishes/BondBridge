import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { CardSetTileProps } from '../types/cardSet';
import ProgressBar from './ProgressBar';
import SkeletonLoader from './SkeletonLoader';

const defaultImage = require('../assets/images/default-set.png');

const CardSetTile: React.FC<CardSetTileProps> = ({
  cardSet,
  progress,
  onPress,
  testID,
  isLoading = false,
}) => {
  const { width } = useWindowDimensions();
  const tileWidth = (width - 48) / 2; // 2 columns with 16px padding on each side

  if (isLoading) {
    return <SkeletonLoader testID="skeleton-loader" width={tileWidth} />;
  }

  const progressPercentage = (progress.totalSeen / progress.totalCards) * 100;

  return (
    <TouchableOpacity
      style={[styles.container, { width: tileWidth }]}
      onPress={() => onPress(cardSet.id)}
      testID={testID}
      accessibilityLabel={`${cardSet.name} card set`}
      accessibilityHint={`${progress.totalSeen} of ${progress.totalCards} cards seen`}
    >
      <Image
        source={cardSet.image || defaultImage}
        style={styles.image}
        testID={cardSet.image ? 'set-image' : 'default-image'}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {cardSet.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {cardSet.description}
        </Text>
        <View style={styles.progressContainer}>
          <ProgressBar progress={progressPercentage} testID="progress-indicator" />
          <Text style={styles.progressText}>
            {progress.totalSeen}/{progress.totalCards}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    padding: 12,
  },
  description: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  image: {
    height: 120,
    resizeMode: 'cover',
    width: '100%',
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: '#666666',
    fontSize: 14,
    marginLeft: 8,
  },
  title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default CardSetTile;
