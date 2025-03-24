# BondBridge Configuration System

## Overview

BondBridge uses a centralized configuration system to provide a single source of truth for application settings. This document outlines the structure and usage of this system.

## Structure

The configuration system is organized in the `/config` directory with the following files:

```
/config
├── constants.ts      # App-wide constants (animations, spacing, etc.)
├── paths.ts          # Path aliases for imports
├── theme.ts          # Theme configuration for light/dark modes
└── index.ts          # Unified export of all config
```

## Usage

### Accessing Configuration

The recommended way to access configuration is through the `ConfigProvider` and `useConfig` hook:

```tsx
import { useConfig } from '../contexts/ConfigContext';

function MyComponent() {
  const config = useConfig();

  // Access any configuration value
  const appVersion = config.app.VERSION;
  const spacing = config.spacing.MD;

  return (
    <View style={{ padding: spacing }}>
      <Text>Version: {appVersion}</Text>
    </View>
  );
}
```

### Configuration Categories

1. **App Metadata**

   ```ts
   const { app } = useConfig();
   console.log(app.NAME); // 'BondBridge'
   ```

2. **Storage Keys**

   ```ts
   const { storage } = useConfig();
   AsyncStorage.getItem(storage.THEME_MODE);
   ```

3. **Animation Durations**

   ```ts
   const { animation } = useConfig();
   Animated.timing(opacity, {
     duration: animation.NORMAL, // 300ms
   });
   ```

4. **Spacing and Layout**

   ```ts
   const { spacing } = useConfig();
   <View style={{ margin: spacing.MD }} />;
   ```

5. **Border Radius**

   ```ts
   const { borderRadius } = useConfig();
   <View style={{ borderRadius: borderRadius.MD }} />;
   ```

6. **Image Constants**

   ```ts
   const { images, utils } = useConfig();
   <Image source={utils.getImageSource(images.DEFAULT_CARD_SET_IMAGE)} />;
   ```

7. **Theme**
   ```ts
   const { theme } = useConfig();
   const styles = StyleSheet.create({
     container: {
       backgroundColor: theme.light.colors.background,
     },
   });
   ```

## Path Aliases

The `paths.ts` file defines all path aliases used in the application. These are configured in both `tsconfig.json` and `babel.config.js` to enable imports like:

```tsx
import MyComponent from '@components/MyComponent';
```

## Utilities

Several utilities have been created to leverage the configuration system:

1. **Style Utilities** (`src/utils/styleUtils.ts`)

   - `useThemedStyles`: Create styles based on theme
   - `createContainerStyles`: Common container styles
   - `createTypographyStyles`: Typography styles
   - `createButtonStyles`: Button styles

2. **Animation Utilities** (`src/utils/animationUtils.ts`)
   - `useFadeAnimation`: Fade in/out animations
   - `useScaleAnimation`: Scale animations
   - `useSharedElementTransition`: Shared element transitions

## Best Practices

1. **Always use the config system** for values that might change or be reused.
2. **Avoid hardcoding values** that are available in the config.
3. **Use the utilities** to ensure consistent styling and animations.
4. **Extend the config** when adding new global constants rather than creating isolated constants.
5. **Use path aliases** for clean imports.

## Migration Guide

If you're working with older code that doesn't use the config system:

1. Replace hardcoded values with config values
2. Use the utility functions for common patterns
3. Update imports to use path aliases
4. Ensure your component uses the ConfigProvider
