# Migration Guide: New Configuration System

This guide outlines the steps to update existing components to use the new centralized configuration system.

## Step 1: Update Imports

Change imports from direct theme or constant imports to using the config provider:

**Before:**

```tsx
import { lightTheme, darkTheme } from '@theme/constants';
import { DEFAULT_CARD_SET_IMAGE } from '@constants/images';
```

**After:**

```tsx
import { useConfig } from '@contexts/ConfigContext';

function MyComponent() {
  const config = useConfig();
  // Use config.theme.light instead of lightTheme
  // Use config.images.DEFAULT_CARD_SET_IMAGE instead of DEFAULT_CARD_SET_IMAGE
}
```

## Step 2: Update Theme Usage

Replace direct theme usage with the config-based theme:

**Before:**

```tsx
import { useTheme } from '@theme/ThemeContext';

function MyComponent() {
  const { theme } = useTheme();

  return <View style={{ backgroundColor: theme.colors.background }} />;
}
```

**After:**

```tsx
import { useConfig } from '@contexts/ConfigContext';
import { useTheme } from '@theme/ThemeContext';

function MyComponent() {
  const { theme } = useTheme(); // Keep using useTheme for now (will be updated later)
  const config = useConfig(); // For other config values

  return <View style={{ backgroundColor: theme.colors.background }} />;
}
```

## Step 3: Utilize Style Utilities

Replace inline styles with the new style utilities:

**Before:**

```tsx
import { useTheme } from '@theme/ThemeContext';
import { StyleSheet } from 'react-native';

function MyComponent() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
}
```

**After:**

```tsx
import { useTheme } from '@theme/ThemeContext';
import { createContainerStyles, createTypographyStyles } from '@utils/style-utils';

function MyComponent() {
  const { theme } = useTheme();

  const containerStyles = createContainerStyles(theme);
  const typographyStyles = createTypographyStyles(theme);

  return (
    <View style={containerStyles.container}>
      <Text style={typographyStyles.heading}>Hello World</Text>
    </View>
  );
}
```

## Step 4: Use Animation Utilities

Replace animation code with the new animation utilities:

**Before:**

```tsx
import { useRef } from 'react';
import { Animated } from 'react-native';

function MyComponent() {
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ opacity }}>
      <Text>Fade In Content</Text>
    </Animated.View>
  );
}
```

**After:**

```tsx
import { useFadeAnimation } from '@utils/animationUtils';

function MyComponent() {
  const { opacity, fadeIn, animatedStyle } = useFadeAnimation();

  return (
    <Animated.View style={animatedStyle}>
      <Text>Fade In Content</Text>
    </Animated.View>
  );
}
```

## Step 5: Apply Container/Presentational Pattern

Split large components into container and presentational components:

**Before:**

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ComplexComponent = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    // Complex logic...
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>{data.title}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View>
          <Text>{data.description}</Text>
        </View>
      )}
    </View>
  );
};
```

**After:**

```tsx
// ComplexComponentContainer.tsx
import React, { useState } from 'react';
import ComplexComponentPresentation from './ComplexComponentPresentation';

const ComplexComponentContainer = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    // Complex logic...
  };

  return (
    <ComplexComponentPresentation
      data={data}
      isExpanded={isExpanded}
      isLoading={isLoading}
      onPress={handlePress}
    />
  );
};

export default ComplexComponentContainer;

// ComplexComponentPresentation.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ComplexComponentPresentation = ({ data, isExpanded, isLoading, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>{data.title}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View>
          <Text>{data.description}</Text>
        </View>
      )}
    </View>
  );
};

export default ComplexComponentPresentation;
```

## Component Migration: Card

### Overview

The Card component has been refactored to use the new configuration system. The component now follows a modular structure with separated concerns:

```
src/components/card/
├── base.tsx         # Presentation layer
├── use-logic.ts     # Business logic
├── types.ts         # Shared types
└── index.ts         # Public exports
```

### Configuration Changes

Card-specific configuration has been moved to the centralized config:

```typescript
// config/constants.ts
export const CARD = {
  dimensions: {
    width: 'SCREEN_WIDTH - 32',
    margin: SPACING.SM,
  },
  animation: {
    flipDuration: ANIMATION.NORMAL,
    swipeThreshold: 0.25,
    rotationFactor: 1.5,
  },
  style: {
    borderRadius: BORDER_RADIUS.LG,
    elevation: 4,
    shadow: {
      /* ... */
    },
    content: {
      /* ... */
    },
    loading: {
      /* ... */
    },
  },
};
```

### Usage Changes

1. Import the Card component:

```typescript
import { Card } from '@components/card';
```

2. The component will automatically use configuration values:

```typescript
<Card
  title="Example Card"
  // Optional overrides for config values
  flipDuration={500} // Override default duration
  swipeThreshold={0.5} // Override default threshold
>
  {/* Card content */}
</Card>
```

3. Access card configuration in custom components:

```typescript
import { useConfig } from '@contexts/ConfigContext';

const MyComponent = () => {
  const config = useConfig();
  const { card } = config.components;

  // Use card configuration values
  const styles = StyleSheet.create({
    container: {
      margin: card.dimensions.margin,
      borderRadius: card.style.borderRadius,
    },
  });
  // ...
};
```

### Breaking Changes

1. Direct style imports from the Card component are no longer supported
2. Animation values should be accessed through the config system
3. Custom card variants should extend the base configuration

### Migration Steps

1. Update imports to use the new path
2. Replace hardcoded values with config values
3. Update custom card implementations to use the new structure
4. Update tests to include ConfigProvider

## Checklist

- [ ] Update imports to use the ConfigProvider
- [ ] Replace hardcoded values with config values
- [ ] Use the style utilities for common styles
- [ ] Use the animation utilities for animations
- [ ] Split large components using container/presentational pattern
- [ ] Create component-specific folders for complex components
- [ ] Update tests to reflect the new structure
