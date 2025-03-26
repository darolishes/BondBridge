# System Patterns

Version: 1.0.0
Last Updated: 2024-03-25 15:04:12
Status: 🟢 Active
Related Files: productContext.md, decisionLog.md

## Naming Conventions 📝

### Components

- ✅ PascalCase for component names (e.g., `CardSwiper`)
- ✅ Props interfaces: `IComponentNameProps` (e.g., `ICardSwiperProps`)
- ✅ Styles: `componentName.styles.ts` (e.g., `cardSwiper.styles.ts`)

### Files

- ✅ kebab-case for file names (e.g., `card-swiper.tsx`)
- ✅ Feature-based directory names (e.g., `card-management/`)
- ✅ Test files: `*.test.ts` or `*.spec.ts`

### Functions

- ✅ camelCase for function names (e.g., `handleSwipe`)
- ✅ Event handlers: `handle*` prefix (e.g., `handleClick`)
- ✅ Async functions: `async*` prefix (e.g., `asyncFetchCards`)

## Project Structure 📁

```
/src
├── components/       # Reusable UI components
├── screens/         # Screen components
├── store/          # Redux store setup
│   ├── slices/     # Redux slices
│   └── middleware/ # Custom middleware
├── utils/          # Helper functions
├── types/          # TypeScript types/interfaces
├── assets/         # Static assets
└── hooks/          # Custom React hooks
```

## Coding Standards 📚

### TypeScript

- ✅ Strict mode enabled
- ✅ Explicit return types on functions
- ✅ Interface over type where possible
- ✅ Proper error handling with types

### Testing

- ✅ Jest + React Testing Library
- ✅ Component tests required
- ✅ Minimum 80% coverage
- ✅ E2E with Detox

### Code Quality

- ✅ ESLint + Prettier
- ✅ Husky pre-commit hooks
- ✅ SonarQube integration (planned)
- ✅ Regular dependency updates

## State Management Patterns 🔄

- Redux Toolkit for global state
- Context API for theme/localization
- Local state for component-specific data
- AsyncStorage for persistence
