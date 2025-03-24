import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { ImageWithPlaceholder } from '@components/common';

interface CardSetImageGridProps {
  images: string[];
}

const { width } = Dimensions.get('window');
const GRID_MARGIN = 8;
const GRID_SIZE = width - GRID_MARGIN * 2;
const ITEM_SIZE = GRID_SIZE / 2 - GRID_MARGIN;
const DEFAULT_IMAGE = 'https://picsum.photos/400/300';

const CardSetImageGrid: React.FC<CardSetImageGridProps> = ({ images }) => {
  const { theme } = useTheme();

  const renderImage = (uri: string, index: number) => (
    <View
      key={index}
      style={[styles.imageContainer, { backgroundColor: theme.colors.surfaceHighlight }]}
    >
      <ImageWithPlaceholder
        source={{ uri: uri || DEFAULT_IMAGE }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {images.slice(0, 4).map((uri, index) => renderImage(uri, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: GRID_MARGIN,
  },
  imageContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: GRID_MARGIN / 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CardSetImageGrid;
