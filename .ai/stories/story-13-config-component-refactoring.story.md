# Story 13: Configuration Consolidation and Component Structure Refactoring

## Status: In Progress 🚧

## Story

As a developer,
I want to consolidate configuration files and refactor component structure,
So that the codebase is more maintainable, follows consistent patterns, and has a single source of truth for configuration.

## Acceptance Criteria

- [ ] Remaining root configuration files are consolidated into the existing `/config` directory
- [ ] Component structure is further organized with clear patterns and naming conventions
- [ ] Large components (>300 lines) are broken down using composition
- [ ] Repeated code patterns are extracted into shared utilities
- [ ] Component and file naming consistently follows kebab-case pattern
- [ ] Existing ConfigContext is enhanced with additional features
- [ ] Container/presentational pattern is applied for large components
- [ ] All tests pass with the new structure

## Technical Implementation

### 1. Configuration Consolidation

Current progress:
✅ Basic config structure established in `/config`
✅ ConfigContext implementation exists

Remaining configuration files to consolidate:

- eslint.config.js
- babel.config.js
- metro.config.js
- webpack.config.js
- app.json
- .env

Enhanced config structure:

```
bondbridge/
├── config/               # Centralized configuration (existing)
│   ├── constants.ts      # App-wide constants
│   ├── paths.ts          # Path aliases configuration
│   ├── theme.ts          # Theme configuration
│   ├── build.ts          # Build-specific configuration
│   ├── env.ts           # Environment variables
│   └── index.ts          # Exports all config
├── src/                  # Source code
└── ... (root config files to be migrated)
```

#### A. Enhanced Config Provider

Existing implementation in `src/contexts/ConfigContext` will be enhanced with:

- Environment-specific configuration
- Build configuration
- Runtime configuration updates
- Configuration validation

### 2. Component Structure Refactoring

Current issues:

- Some components exceed 300 lines (Card.tsx, ThemeToggle.tsx, ThemeContext.tsx)
- Duplicate styling patterns across components
- Inconsistent naming conventions

Proposed structure (following kebab-case):

```
src/
├── components/
│   ├── card/             # Card components
│   │   ├── card.tsx           # Main component (refactored)
│   │   ├── card-content.tsx   # Extracted component
│   │   ├── card-actions.tsx   # Extracted component
│   │   ├── card-container.tsx # Container component
│   │   ├── card-presentation.tsx # Presentational component
│   │   └── index.ts           # Re-exports
│   ├── common/           # Common components
│   │   ├── button/      # Button component
│   │   │   ├── button.tsx
│   │   │   ├── button-styles.ts
│   │   │   └── index.ts
│   │   └── ... (other common components)
│   └── ... (other component dirs)
```

#### A. Container/Presentational Pattern with Kebab Case

For large components:

```typescript
// src/components/card/card-container.tsx
import React from 'react';
import { CardPresentation } from './card-presentation';
import { useCardLogic } from '@hooks/use-card-logic';

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

Extract common functionality into shared utilities (using kebab-case):

```typescript
// src/utils/style-utils.ts
import { Theme } from '@types';

export const createThemedStyles = (theme: Theme, isDark: boolean) => ({
  container: {
    backgroundColor: isDark ? theme.colors.surface : theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  // ... other common styles
});

// src/utils/animation-utils.ts
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

1. [ ] Review existing kebab-case migration progress (src/docs/kebab-case-migration.md)
2. [ ] Analyze and inventory all configuration files
3. [ ] Create centralized config structure in /config directory
4. [ ] Implement ConfigProvider pattern
5. [ ] Update component file names to kebab-case (e.g., card.tsx, theme-toggle.tsx)
6. [ ] Refactor large components using container/presentational pattern
7. [ ] Extract common styles and animations into kebab-case utility files
8. [ ] Update imports and references to match new naming convention
9. [ ] Update documentation with kebab-case standards
10. [ ] Run tests and fix any issues
11. [ ] Add linting rules for enforcing kebab-case

## Dependencies

- Story 1: Project Initialization
- Story 3: Theme Customization
- Story 5: Project Structure Refactor

## Estimation

- Configuration analysis: 2 hours
- Config consolidation: 4 hours
- Kebab-case migration: 4 hours
- Component refactoring: 8 hours
- Shared utilities extraction: 3 hours
- Testing and fixes: 6 hours
- Documentation: 3 hours
  Total: 30 hours

## Notes

- Maintain backward compatibility during transition
- Consider impact on build pipeline
- Add clear documentation for the new patterns
- Follow existing kebab-case migration guide in src/docs/kebab-case-migration.md
- Add ESLint rule to enforce kebab-case for file names
- Consider component size limits and enforcing container/presentational pattern
- Update IDE settings to default to kebab-case when creating new files
- Create scripts to automate file renaming where possible
