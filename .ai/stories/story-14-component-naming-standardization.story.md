# Story 14: Component Naming Standardization

## Status: Completed ✅

## Story

As a developer,
I want to standardize component naming conventions and structure,
So that the codebase follows consistent patterns and best practices.

## Technical Implementation

### 1. Component Naming Convention

- Migrated all components to kebab-case naming:
  - `CardSetTile` → `card-set-tile`
  - `ThemeToggle` → `theme-toggle`
  - `EmptyState` → `empty-state`
  - `Header` → `header`

### 2. File Structure Improvements

```typescript
// Before:
src / components / CardSetTile / CardSetTile.tsx;
src / components / ThemeToggle / index.tsx;
src / components / EmptyState.tsx;

// After:
src / components / card - set - tile / index.tsx;
src / components / theme - toggle / index.tsx;
src / components / empty - state / index.tsx;
```

### 3. Style Organization

```typescript
// styles.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

type Styles = {
  container: ViewStyle;
  listContent: ViewStyle;
  columnWrapper: ViewStyle;
  importButton: ViewStyle;
  buttonText: TextStyle;
  themeToggleContainer: ViewStyle;
  header: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  // ... style definitions
});
```

### 4. Component Composition

```typescript
// welcome-state.tsx
import React from 'react';
import { View, ViewStyle } from 'react-native';
import EmptyState from '@components/empty-state';
import ThemeToggle from '@components/theme-toggle';
import { styles } from '../styles';

interface WelcomeStateProps {
  title: string;
  message?: string;
  icon?: string;
  showThemeToggle?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export const WelcomeState: React.FC<WelcomeStateProps> = ({
  title,
  message,
  icon = 'heart-outline',
  showThemeToggle = true,
  style,
}) => (
  <View style={style}>
    <EmptyState title={title} message={message} icon={icon} />
    {showThemeToggle && (
      <View style={styles.themeToggleContainer}>
        <ThemeToggle showLabels enableSystemTheme />
      </View>
    )}
  </View>
);
```

## Tasks

1. [x] Create naming convention guidelines
2. [x] Update file structure
3. [x] Migrate component names to kebab-case
4. [x] Extract styles to separate files
5. [x] Create reusable components
6. [x] Update import statements
7. [x] Test component functionality
8. [x] Update documentation

## Dependencies

- Story 11: Expo Router Migration
- Story 12: Image System Enhancement
- Story 13: Config Component Refactoring

## Estimation

- File renaming: 1 hour
- Component restructuring: 2 hours
- Style extraction: 1 hour
- Testing: 1 hour
- Documentation: 1 hour
  Total: 6 hours

## Notes

- Applied naming convention consistently across codebase
- Improved component reusability and maintainability
- Simplified import statements
- Centralized styles management
- Enhanced type safety with TypeScript
