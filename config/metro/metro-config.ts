import { getDefaultConfig } from 'expo/metro-config';
import path from 'path';

interface MetroConfig {
  resolver: {
    sourceExts: string[];
    extraNodeModules: {
      [key: string]: string;
    };
  };
}

const projectRoot = path.resolve(__dirname, '../..');

export const metroConfig = (() => {
  const config = getDefaultConfig(projectRoot) as MetroConfig;

  // Add custom configuration
  config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];
  config.resolver.extraNodeModules = {
    '@components': path.resolve(projectRoot, 'src/components'),
    '@screens': path.resolve(projectRoot, 'src/screens'),
    '@utils': path.resolve(projectRoot, 'src/utils'),
    '@hooks': path.resolve(projectRoot, 'src/hooks'),
    '@theme': path.resolve(projectRoot, 'src/theme'),
    '@types': path.resolve(projectRoot, 'src/types'),
    '@assets': path.resolve(projectRoot, 'assets'),
  };

  return config;
})();
