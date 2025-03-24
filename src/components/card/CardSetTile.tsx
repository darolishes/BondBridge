import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { CardSetData, CardSetProgress } from '@types';
import { ImageWithPlaceholder, SkeletonLoader } from '@components/common';
import { getImageSource } from '@constants/images';

interface CardSetTileProps {
  item: CardSetData;
  progress: CardSetProgress;
  onPress: (cardSetId: string) => void;
  testID?: string;
  isLoading?: boolean;
}

const { width } = Dimensions.get('window');
const TILE_MARGIN = 8;
const TILE_WIDTH = (width - TILE_MARGIN * 4) / 2;

const CardSetTile: React.FC<CardSetTileProps> = ({
  item,
  progress,
  onPress,
  testID,
  isLoading = false,
}) => {
  const { theme } = useTheme();

  if (isLoading) {
    return <SkeletonLoader testID="skeleton-loader" width={TILE_WIDTH} />;
  }

  const progressPercentage = Math.round((progress.totalSeen / progress.totalCards) * 100);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      onPress={() => onPress(item.id)}
      testID={testID}
      accessibilityLabel={`${item.name} card set`}
      accessibilityHint={`${progress.totalSeen} of ${item.totalCards} cards seen`}
    >
      <ImageWithPlaceholder
        source={getImageSource(item.image)}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor: theme.colors.progressBackground,
              },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: theme.colors.primary,
                  width: `${progressPercentage}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.colors.text }]}>
            {progressPercentage}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: TILE_WIDTH,
    margin: TILE_MARGIN,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: TILE_WIDTH * 0.6,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default CardSetTile;
