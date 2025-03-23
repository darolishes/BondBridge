# BondBridge - Project Structure Documentation

## Status: Approved

## Root Directory Structure

```
BondBridge/
├── .ai/                    # AI-assisted development documentation
│   ├── project/           # Core project documentation
│   │   ├── 01-prd.md     # Project Requirements Document
│   │   ├── 02-arch.md    # Architecture documentation
│   │   ├── 03-structure.md # Project structure documentation
│   │   └── 04-deployment.md # Deployment configuration
│   ├── stories/          # User stories (primary development focus)
│   │   ├── story-1-setup-nativecn.story.md
│   │   └── story-2-theme.story.md
│   ├── status/           # Development session tracking
│   │   ├── YYYY-MM-DD.md # Daily status updates
│   │   └── active-context.md # Current development context
│   └── artifacts/        # Project artifacts and diagrams
├── src/                   # Source code
│   ├── components/       # UI components
│   ├── screens/          # App screens
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utilities
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   ├── theme/           # Theme configuration
│   └── assets/          # Static assets
├── __tests__/            # Test files
├── .github/              # GitHub configuration
├── app.json             # Expo configuration
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Source Code Organization

### Components (`src/components/`)

```
components/
├── Card/
│   ├── index.tsx          # Main component
│   ├── Card.test.tsx      # Component tests
│   ├── Card.stories.tsx   # Component stories
│   ├── types.ts           # Type definitions
│   └── styles.ts          # Component styles
├── Navigation/
│   ├── index.tsx
│   └── types.ts
└── shared/
    ├── Button/
    ├── Progress/
    └── Typography/
```

### Screens (`src/screens/`)

```
screens/
├── Home/
│   ├── index.tsx          # Screen component
│   ├── Home.test.tsx      # Screen tests
│   ├── Home.e2e.ts        # E2E tests
│   ├── components/        # Screen-specific components
│   │   └── HomeHeader/
│   └── hooks/            # Screen-specific hooks
│       └── useHomeData.ts
├── CardView/
│   ├── index.tsx
│   └── components/
└── Settings/
    ├── index.tsx
    └── components/
```

### Hooks (`src/hooks/`)

```
hooks/
├── core/                 # Core application hooks
│   ├── useCardSet.ts     # Card set management
│   ├── useProgress.ts    # Progress tracking
│   └── useTheme.ts       # Theme management
├── accessibility/        # Accessibility hooks
│   ├── useA11y.ts       # Base accessibility hook
│   └── useVoiceOver.ts  # iOS VoiceOver support
├── animation/           # Animation hooks
│   ├── useCardSwipe.ts  # Card swipe animations
│   └── useTransition.ts # General transitions
└── utils/              # Utility hooks
    ├── useDebounce.ts
    └── useMount.ts
```

### Services (`src/services/`)

```
services/
├── storage/
│   ├── index.ts
│   └── types.ts
├── cardsets/
│   ├── index.ts
│   └── types.ts
├── i18n/
│   ├── index.ts
│   └── locales/
└── accessibility/
    ├── index.ts
    └── actions/
```

### Assets (`src/assets/`)

```
assets/
├── images/
│   ├── sets/            # Card set images
│   │   ├── basic/       # Basic set assets
│   │   └── premium/     # Premium set assets
│   ├── backgrounds/     # Background images
│   └── icons/          # App icons
├── fonts/
│   ├── Inter/          # Primary font
│   └── Poppins/        # Heading font
└── animations/         # Lottie animations
    └── transitions/    # Screen transitions
```

## Testing Structure

### Unit Tests (`__tests__/`)

```
__tests__/
├── components/          # Component tests
│   └── Card/
├── hooks/              # Hook tests
│   └── useCardSet/
├── services/           # Service tests
│   └── storage/
└── utils/             # Utility tests
```

### Screen Tests

```typescript
// Screen test structure
describe("HomeScreen", () => {
  // Component rendering
  it("renders correctly", () => {});

  // User interactions
  it("handles card swipe", () => {});

  // Navigation
  it("navigates to card view", () => {});

  // State management
  it("manages progress state", () => {});

  // Error handling
  it("handles loading errors", () => {});
});
```

### E2E Tests

```typescript
// E2E test structure
describe("Card Flow", () => {
  // Setup
  beforeAll(async () => {
    await device.launchApp();
  });

  // Test cases
  it("completes card flow", async () => {
    await element(by.id("card-1")).swipe("left");
    await expect(element(by.id("progress"))).toHaveText("1/20");
  });
});
```

## Development Guidelines

### File Naming Conventions

- Components: PascalCase
- Hooks: camelCase with 'use' prefix
- Services: camelCase
- Tests: ComponentName.test.tsx
- Stories: ComponentName.stories.tsx
- Types: ComponentName.types.ts

### Import Structure

1. External dependencies
2. Internal components
3. Hooks
4. Types
5. Styles
6. Assets

### Component Structure

```typescript
// Component template
import { FC } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useAccessibility } from "@/hooks/accessibility";
import { ComponentProps } from "./types";
import { styles } from "./styles";

export const Component: FC<ComponentProps> = (
  {
    // Props
  }
) => {
  // Hooks
  const { t } = useTranslation();
  const a11y = useAccessibility();

  // State & Effects

  // Handlers

  // Render
  return <View>{/* Component content */}</View>;
};
```

### Hook Structure

```typescript
// Hook template
import { useState, useEffect } from "react";
import { HookConfig, HookResult } from "./types";

export const useCustomHook = (config: HookConfig): HookResult => {
  // State

  // Effects

  // Handlers

  // Return
  return {
    // Hook API
  };
};
```

## Documentation Requirements

### Component Documentation

```typescript
/**
 * @component ComponentName
 * @description Brief description
 *
 * @example
 * <ComponentName prop="value" />
 *
 * @props {PropType} propName - Description
 */
```

### Hook Documentation

```typescript
/**
 * @hook useHookName
 * @description Brief description
 *
 * @param {ConfigType} config - Configuration object
 * @returns {ResultType} Hook result
 *
 * @example
 * const result = useHookName({ option: true });
 */
```

### Test Documentation

```typescript
/**
 * @test ComponentName
 * @group unit|integration|e2e
 *
 * Test cases:
 * 1. Rendering
 * 2. User interaction
 * 3. State management
 * 4. Error handling
 */
```

## Asset Management

### Image Guidelines

- Format: PNG/WebP for UI, JPEG for photos
- Resolution: @2x and @3x for iOS
- Size: Maximum 1MB per image
- Naming: kebab-case-descriptive-name.ext

### Font Guidelines

- Format: TTF/OTF
- Weights: Regular, Medium, Bold
- Subsets: Latin, Extended Latin
- License: Include in assets/fonts/LICENSE

### Animation Guidelines

- Format: JSON (Lottie)
- Duration: Maximum 3 seconds
- Size: Maximum 100KB
- Performance: Maximum 60fps

## Version Control

### Branch Structure

```
main
├── develop
│   ├── feature/story-1-setup
│   ├── feature/story-2-theme
│   └── bugfix/issue-123
└── release/1.0.0
```

### Commit Convention

```
type(scope): description

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Test addition/modification
- chore: Maintenance
```
