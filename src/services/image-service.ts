import { ImageSourcePropType, Image } from 'react-native';
import * as FileSystem from 'react-native-fs';
import { Platform } from 'react-native';

// Define image categories and their default images
export const ImageCategories = {
  DEFAULT: 'default',
  BASIC: 'basic',
  INTIMATE: 'intimate',
  DEEP: 'deep',
  GROWTH: 'growth',
} as const;

type ImageCategory = (typeof ImageCategories)[keyof typeof ImageCategories];

// Image cache interface
interface ImageCache {
  [key: string]: {
    source: ImageSourcePropType;
    timestamp: number;
    size: number;
  };
}

class ImageService {
  private static instance: ImageService;
  private cache: ImageCache = {};
  private readonly cacheDir: string;
  private readonly cacheDuration = 7 * 24 * 60 * 60 * 1000; // 7 days
  private readonly maxCacheSize = 50 * 1024 * 1024; // 50MB
  private currentCacheSize = 0;

  private constructor() {
    this.cacheDir = `${FileSystem.CachesDirectoryPath}/card-set-images`;
    this.initializeCache();
  }

  public static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  private async initializeCache(): Promise<void> {
    try {
      const exists = await FileSystem.exists(this.cacheDir);
      if (!exists) {
        await FileSystem.mkdir(this.cacheDir);
      }

      // Load cache metadata if exists
      const metadataPath = `${this.cacheDir}/metadata.json`;
      if (await FileSystem.exists(metadataPath)) {
        const metadata = await FileSystem.readFile(metadataPath, 'utf8');
        const parsedMetadata = JSON.parse(metadata);
        this.cache = parsedMetadata.cache || {};
        this.currentCacheSize = parsedMetadata.totalSize || 0;
      }

      // Clean old cache entries
      await this.cleanCache();
    } catch (error) {
      console.error('Failed to initialize image cache:', error);
    }
  }

  private async cleanCache(): Promise<void> {
    const now = Date.now();
    const entriesToRemove: string[] = [];

    // Identify old entries
    Object.entries(this.cache).forEach(([key, entry]) => {
      if (now - entry.timestamp > this.cacheDuration) {
        entriesToRemove.push(key);
        this.currentCacheSize -= entry.size;
      }
    });

    // Remove old entries
    for (const key of entriesToRemove) {
      delete this.cache[key];
      const path = `${this.cacheDir}/${key}`;
      if (await FileSystem.exists(path)) {
        await FileSystem.unlink(path);
      }
    }

    // Update metadata
    await this.saveMetadata();
  }

  private async saveMetadata(): Promise<void> {
    try {
      const metadata = {
        cache: this.cache,
        totalSize: this.currentCacheSize,
        lastUpdate: Date.now(),
      };
      await FileSystem.writeFile(
        `${this.cacheDir}/metadata.json`,
        JSON.stringify(metadata),
        'utf8'
      );
    } catch (error) {
      console.error('Failed to save cache metadata:', error);
    }
  }

  public getDefaultImage(category: ImageCategory = ImageCategories.DEFAULT): ImageSourcePropType {
    const images: Record<ImageCategory, ImageSourcePropType> = {
      [ImageCategories.DEFAULT]: require('../../assets/images/default-set.webp'),
      [ImageCategories.BASIC]: require('../../assets/images/basic-set.webp'),
      [ImageCategories.INTIMATE]: require('../../assets/images/intimate-set.webp'),
      [ImageCategories.DEEP]: require('../../assets/images/deep-set.webp'),
      [ImageCategories.GROWTH]: require('../../assets/images/growth-set.webp'),
    };

    return images[category] || images[ImageCategories.DEFAULT];
  }

  public getThumbnailImage(category: ImageCategory = ImageCategories.DEFAULT): ImageSourcePropType {
    const thumbnails: Record<ImageCategory, ImageSourcePropType> = {
      [ImageCategories.DEFAULT]: require('../../assets/images/default-set-thumb.webp'),
      [ImageCategories.BASIC]: require('../../assets/images/basic-set-thumb.webp'),
      [ImageCategories.INTIMATE]: require('../../assets/images/intimate-set-thumb.webp'),
      [ImageCategories.DEEP]: require('../../assets/images/deep-set-thumb.webp'),
      [ImageCategories.GROWTH]: require('../../assets/images/growth-set-thumb.webp'),
    };

    return thumbnails[category] || thumbnails[ImageCategories.DEFAULT];
  }

  public preloadImages(): Promise<void[]> {
    const images = Object.values(ImageCategories).flatMap(category => [
      this.getDefaultImage(category as ImageCategory),
      this.getThumbnailImage(category as ImageCategory),
    ]);

    return Promise.all(
      images.map(image => {
        if (Platform.OS === 'web') {
          return Promise.resolve();
        }
        return new Promise<void>((resolve, reject) => {
          Image.prefetch((image as any).uri || '')
            .then(() => resolve())
            .catch(reject);
        });
      })
    );
  }

  public getImageForName(imageName: string, thumbnail = false): ImageSourcePropType {
    // Remove file extension and convert to uppercase for matching
    const normalizedName = imageName.split('.')[0].toUpperCase();

    // Try to match with a category
    const matchedCategory = Object.entries(ImageCategories).find(
      ([_, value]) => value.toUpperCase() === normalizedName
    );

    if (matchedCategory) {
      return thumbnail
        ? this.getThumbnailImage(matchedCategory[1] as ImageCategory)
        : this.getDefaultImage(matchedCategory[1] as ImageCategory);
    }

    // If no match found, return default image
    return thumbnail ? this.getThumbnailImage() : this.getDefaultImage();
  }
}

export const imageService = ImageService.getInstance();
