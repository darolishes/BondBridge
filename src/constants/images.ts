import { ImageSourcePropType } from 'react-native';

// Default placeholder image for card sets
export const DEFAULT_CARD_SET_IMAGE = 'https://picsum.photos/400/300';

export const getImageSource = (source: string | number | undefined): ImageSourcePropType => {
  if (!source) {
    return { uri: DEFAULT_CARD_SET_IMAGE };
  }

  if (typeof source === 'number') {
    return source; // Return the require() result directly
  }

  return { uri: source };
};
