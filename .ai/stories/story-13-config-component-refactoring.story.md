# Story 13: Configuration Consolidation and Component Structure Refactoring

## Status: In Progress 🚧

## Story

As a developer,
I want to consolidate configuration files and refactor component structure,
So that the codebase is more maintainable, follows consistent patterns, and has a single source of truth for configuration.

## Acceptance Criteria

- [ ] Root configuration files are consolidated into a single source of truth
- [ ] Component structure is organized with clear patterns and naming conventions
- [ ] Large components (>300 lines) are broken down using composition
- [ ] Repeated code patterns are extracted into shared utilities
- [ ] Component and file naming follows project standards
- [ ] Config provider pattern is implemented for global configuration
- [ ] Container/presentational pattern is applied for large components
- [ ] All tests pass with the new structure

## Technical Implementation

### 1. Configuration Consolidation

Current configuration files:

- eslint.config.js
- .eslintrc.js
- tsconfig.json
- babel.config.js
- metro.config.js
- webpack.config.js
- app.json
- .env
- theme configuration in src/theme

Proposed structure:

```
bondbridge/
├── config/               # Centralized configuration
│   ├── constants.ts      # App-wide constants
│   ├── paths.ts          # Path aliases configuration
│   ├── theme.ts          # Theme configuration
│   └── index.ts          # Exports all config
├── src/                  # Source code remains the same
└── ... (other root files)
```

#### A. Config Provider Pattern

```typescript
// src/contexts/ConfigContext.tsx
import React, { createContext, useContext } from 'react';
import { appConfig } from '@config';

const ConfigContext = createContext(appConfig);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
  config = appConfig,
}) => {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => useContext(ConfigContext);
```

### 2. Component Structure Refactoring

Current issues:

- Some components exceed 300 lines (Card.tsx, ThemeToggle.tsx, ThemeContext.tsx)
- Duplicate styling patterns across components
- Inconsistent naming conventions

Proposed structure:

```
src/
├── components/
│   ├── card/             # Card components
│   │   ├── Card.tsx      # Main component (refactored)
│   │   ├── CardContent.tsx  # Extracted component
│   │   ├── CardActions.tsx  # Extracted component
│   │   └── index.ts      # Re-exports
│   ├── common/           # Common components
│   │   ├── Button/       # Button component
│   │   │   ├── Button.tsx
│   │   │   ├── ButtonStyles.ts
│   │   │   └── index.ts
│   │   └── ... (other common components)
│   └── ... (other component dirs)
```

#### A. Container/Presentational Pattern

For large components:

```typescript
// src/components/card/CardContainer.tsx
import React from 'react';
import { CardPresentation } from './CardPresentation';
import { useCardLogic } from '@hooks/useCardLogic';

const CardContainer = props => {
  // Logic, state, and handlers
  const {
    isFlipped,
    handleFlip,
    // ... other logic
  } = useCardLogic(props);

  return (
    <CardPresentation
      {...props}
      isFlipped={isFlipped}
      onFlip={handleFlip}
      // ... other props
    />
  );
};

export default CardContainer;
```

### 3. Shared Utilities Extraction

Extract common functionality into shared utilities:

```typescript
// src/utils/styles.ts
import { Theme } from '@types';

export const createThemedStyles = (theme: Theme, isDark: boolean) => ({
  container: {
    backgroundColor: isDark ? theme.colors.surface : theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  // ... other common styles
});

// src/utils/animations.ts
import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimatedValue = (initialValue: number) => {
  return useRef(new Animated.Value(initialValue)).current;
};

export const createFadeAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number
) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    useNativeDriver: true,
  });
};

// ... other common animations
```

## Tasks

1. [ ] Analyze and inventory all configuration files
2. [ ] Create centralized config structure in /config directory
3. [ ] Implement ConfigProvider pattern
4. [ ] Refactor large components (Card, ThemeToggle, ThemeContext)
5. [ ] Extract common styles and animations into utilities
6. [ ] Apply container/presentational pattern to large components
7. [ ] Update imports and references across codebase
8. [ ] Document new patterns and conventions
9. [ ] Run tests and fix any issues
10. [ ] Update documentation

## Dependencies

- Story 1: Project Initialization
- Story 3: Theme Customization
- Story 5: Project Structure Refactor

## Estimation

- Configuration analysis: 2 hours
- Config consolidation: 4 hours
- Component refactoring: 8 hours
- Shared utilities extraction: 3 hours
- Testing and fixes: 4 hours
- Documentation: 2 hours
  Total: 23 hours

## Notes

- Maintain backward compatibility during transition
- Consider impact on build pipeline
- Add clear documentation for the new patterns
- Consider implementing a linting rule to enforce component size limits
