import { ImageCategories, imageService } from '../image-service';
import { Platform } from 'react-native';

jest.mock('react-native/Libraries/Image/Image', () => ({
  prefetch: jest.fn().mockResolvedValue(true),
}));

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
}));

jest.mock('react-native-fs', () => ({
  CachesDirectoryPath: '/mock/cache',
  exists: jest.fn().mockResolvedValue(true),
  mkdir: jest.fn().mockResolvedValue(undefined),
  readFile: jest.fn().mockResolvedValue('{"cache":{},"totalSize":0}'),
  writeFile: jest.fn().mockResolvedValue(undefined),
  unlink: jest.fn().mockResolvedValue(undefined),
}));

describe('ImageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return default image when no category is specified', () => {
    const image = imageService.getDefaultImage();
    expect(image).toBeDefined();
    expect((image as any).testUri).toContain('default-set.webp');
  });

  it('should return thumbnail image when no category is specified', () => {
    const image = imageService.getThumbnailImage();
    expect(image).toBeDefined();
    expect((image as any).testUri).toContain('default-set-thumb.webp');
  });

  it('should return correct image for each category', () => {
    Object.values(ImageCategories).forEach(category => {
      const image = imageService.getDefaultImage(category);
      expect(image).toBeDefined();
      expect((image as any).testUri).toContain(`${category}-set.webp`);
    });
  });

  it('should return correct thumbnail for each category', () => {
    Object.values(ImageCategories).forEach(category => {
      const image = imageService.getThumbnailImage(category);
      expect(image).toBeDefined();
      expect((image as any).testUri).toContain(`${category}-set-thumb.webp`);
    });
  });

  it('should return image by name', () => {
    const image = imageService.getImageForName('basic.png');
    expect(image).toBeDefined();
    expect((image as any).testUri).toContain('basic-set.webp');
  });

  it('should return thumbnail by name when thumbnail flag is true', () => {
    const image = imageService.getImageForName('basic.png', true);
    expect(image).toBeDefined();
    expect((image as any).testUri).toContain('basic-set-thumb.webp');
  });

  it('should return default image for unknown name', () => {
    const image = imageService.getImageForName('unknown.png');
    expect(image).toBeDefined();
    expect((image as any).testUri).toContain('default-set.webp');
  });

  it('should return default thumbnail for unknown name when thumbnail flag is true', () => {
    const image = imageService.getImageForName('unknown.png', true);
    expect(image).toBeDefined();
    expect((image as any).testUri).toContain('default-set-thumb.webp');
  });

  it('should preload all images including thumbnails', async () => {
    const Image = require('react-native/Libraries/Image/Image');
    await imageService.preloadImages();

    // We expect two calls per category (full size + thumbnail)
    const expectedCalls = Object.keys(ImageCategories).length * 2;
    expect(Image.prefetch).toHaveBeenCalledTimes(expectedCalls);
  });

  it('should not attempt to prefetch images on web platform', async () => {
    Platform.OS = 'web';
    const Image = require('react-native/Libraries/Image/Image');
    await imageService.preloadImages();
    expect(Image.prefetch).not.toHaveBeenCalled();
  });
});
