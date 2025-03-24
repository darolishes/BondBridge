import { ConfigContext, ExpoConfig } from '@expo/webpack-config';
import { Configuration } from 'webpack';
import path from 'path';

const projectRoot = path.resolve(__dirname, '../..');

export const webpackConfig = async (
  env: ConfigContext,
  argv: ExpoConfig
): Promise<Configuration> => {
  const createExpoWebpackConfigAsync = require('@expo/webpack-config');
  const config = await createExpoWebpackConfigAsync(env, argv);

  if (config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(projectRoot, 'src/components'),
      '@screens': path.resolve(projectRoot, 'src/screens'),
      '@utils': path.resolve(projectRoot, 'src/utils'),
      '@hooks': path.resolve(projectRoot, 'src/hooks'),
      '@theme': path.resolve(projectRoot, 'src/theme'),
      '@types': path.resolve(projectRoot, 'src/types'),
      '@assets': path.resolve(projectRoot, 'assets'),
    };
  }

  return config;
};
