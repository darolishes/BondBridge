import { ConstantsConfig } from '../core/schema';

export const constantsConfig: ConstantsConfig = {
  APP_NAME: 'BondBridge',
  API_VERSION: '1.0.0',
  DEFAULT_LOCALE: 'de-DE',
  CACHE_DURATION: 3600000, // 1 Stunde in Millisekunden
  IMAGE_SIZES: {
    THUMBNAIL: 150,
    PREVIEW: 300,
    FULL: 1200,
  },
};

// Konstanten-Utility-Funktionen
export const getImageSize = (sizeKey: keyof ConstantsConfig['IMAGE_SIZES']) => {
  return constantsConfig.IMAGE_SIZES[sizeKey];
};

export const getCacheDuration = () => {
  return constantsConfig.CACHE_DURATION;
};

// Environment-spezifische Überschreibungen
export const getEnvironmentSpecificConstants = (env: string): Partial<ConstantsConfig> => {
  switch (env) {
    case 'development':
      return {
        CACHE_DURATION: 0, // Kein Caching in der Entwicklung
      };
    case 'test':
      return {
        CACHE_DURATION: 1000, // Kurzes Caching für Tests
      };
    default:
      return {};
  }
};

// Konstanten mit Environment-Überschreibungen kombinieren
const envOverrides = getEnvironmentSpecificConstants(process.env.NODE_ENV || 'development');
export const finalConfig: ConstantsConfig = {
  ...constantsConfig,
  ...envOverrides,
};

export default finalConfig;
