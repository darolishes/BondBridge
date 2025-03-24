import { ImageSourcePropType } from 'react-native';
import { useEffect, useState } from 'react';
import { imageService } from '@services/image-service';

// Default images for card sets
const defaultImages: Record<string, ImageSourcePropType> = {
  default: require('../../assets/images/default-set.png'),
  basic: require('../../assets/images/basic-set.png'),
  intimate: require('../../assets/images/intimate-set.png'),
  deep: require('../../assets/images/deep-set.png'),
  growth: require('../../assets/images/growth-set.png'),
};

export const useCardSetImage = (imageName: string): ImageSourcePropType => {
  const [image, setImage] = useState<ImageSourcePropType>(() =>
    imageService.getImageForName(imageName)
  );

  useEffect(() => {
    // Update image if imageName changes
    setImage(imageService.getImageForName(imageName));
  }, [imageName]);

  return image;
};

// Preload all default images
export const preloadCardSetImages = (): Promise<void[]> => {
  return imageService.preloadImages();
};
