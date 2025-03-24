import { registerRootComponent } from 'expo';

import App from './app';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// Feature exports
export * from '@features/cards';
export * from '@features/progress';
export * from '@features/import';
export * from '@features/layout';

// Core exports - using more specific paths to avoid conflicts
export { useTheme, ThemeProvider, type Theme } from '@theme/theme-context';

// Utility exports
export * from '@utils';

// Type exports
export type { ImportResult, ImportError } from '@types';
