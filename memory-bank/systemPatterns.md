# System Patterns

Version: 1.1.0
Last Updated: 2025-03-26 10:22:18
Status: 🟢 Active
Related Files: productContext.md, decisionLog.md, technical-debt.md

## Naming Conventions 📝

### Components

- ✅ PascalCase for component names (e.g., `CardSwiper`)
- ✅ Props interfaces: `ComponentNameProps` (e.g., `CardSwiperProps`)
- ✅ Styles: `useStyles.ts` hook in component directory
- ✅ Component index files for cleaner imports

### Files

- ✅ kebab-case for file names (e.g., `card-swiper.tsx`)
- ✅ Feature-based directory names (e.g., `card-management/`)
- ✅ Test files: `*.test.tsx` or `*.spec.tsx`
- ✅ Types: `*.types.ts`

### Functions

- ✅ camelCase for function names (e.g., `handleSwipe`)
- ✅ Event handlers: `handle*` prefix (e.g., `handleSwipe`)
- ✅ Custom hooks: `use*` prefix (e.g., `useCardSwipe`)
- ✅ Async functions with Promise return type annotation

## Project Structure 📁

```
/src
├── features/            # Feature-based organization
│   ├── cards/           # Card feature
│   │   ├── components/  # Card-specific components
│   │   ├── screens/     # Card screens
│   │   ├── hooks/       # Card-specific hooks
│   │   ├── types/       # Card type definitions
│   │   ├── utils/       # Card utility functions
│   │   └── index.ts     # Feature exports
│   ├── categories/      # Categories feature
│   ├── settings/        # Settings feature
│   └── auth/            # Authentication feature (future)
├── common/              # Shared resources
│   ├── components/      # Shared UI components
│   ├── hooks/           # Shared custom hooks
│   ├── utils/           # Shared utility functions
│   └── types/           # Shared type definitions
├── navigation/          # Navigation configuration
├── store/               # Redux store setup
│   ├── slices/          # Redux slices
│   ├── middleware/      # Custom middleware
│   └── hooks.ts         # Typed hooks for store access
├── theme/               # Theme configuration
│   ├── index.ts         # Theme exports
│   ├── lightTheme.ts    # Light theme definition
│   └── darkTheme.ts     # Dark theme definition
└── app.tsx              # Main application component
```

## Coding Standards 📚

### TypeScript

- ✅ Strict mode enabled
- ✅ Explicit return types on functions
- ✅ Prefer type over interface for consistency
- ✅ Proper error handling with typed errors
- ✅ Zod for runtime type validation

### React Patterns

- ✅ Functional components with hooks
- ✅ Custom hooks for shared logic
- ✅ Memoization with useMemo and useCallback
- ✅ Component composition over inheritance
- ✅ Avoid inline styling

### Testing

- ✅ Jest + React Testing Library
- ✅ Component tests required
- ✅ Minimum 80% coverage
- ✅ E2E with Detox
- ✅ Custom testing hooks for common patterns

### Code Quality

- ✅ ESLint + Prettier
- ✅ Husky pre-commit hooks
- ✅ SonarQube integration (planned)
- ✅ Regular dependency updates
- ✅ Import sorting with eslint-plugin-import

## State Management Patterns 🔄

- ✅ Redux Toolkit for global state

  - Slices for feature-based state
  - RTK Query for API caching (future)
  - Selective state persistence

- ✅ React Query for remote data

  - Cached responses
  - Optimistic updates
  - Automatic retries

- ✅ Local state

  - useState for simple UI state
  - useReducer for complex component state

- ✅ Persistence strategy
  - Redux-persist for global state
  - AsyncStorage for app settings
  - Migration strategies for data schema changes

## Animation and Gesture Patterns 🎭

- ✅ React Native Reanimated for performance

  - Worklets for UI thread animations
  - Shared values for animation state

- ✅ Gesture Handler for interactions

  - Pan handlers for swipe
  - Tap handlers for press
  - Composition for complex gestures

- ✅ Layout Animation for simple transitions
  - Automatic layout animations
  - Coordinated transitions
