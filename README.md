# BondBridge

A React Native application built with Expo and TypeScript.

## Project Structure

The project follows a feature-based organization:

```
src/
  features/           # Feature-based organization
    cards/           # Card-related features
    progress/        # Progress tracking features
    import/          # Import functionality
    layout/          # Layout components
  theme/             # Theme configuration
  i18n/              # Internationalization
  utils/             # Shared utilities
  types/             # Shared types
```

### Naming Conventions

- Files use kebab-case: `feature-name.tsx`
- Component files: `component-name.tsx`
- Type files: `component-name.types.ts`
- Style files: `component-name.styles.ts`
- Test files: `component-name.test.ts`
- Story files: `component-name.stories.tsx`
- Hook files: `use-feature-name.ts`
- Service files: `feature-name.service.ts`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on specific platforms:

```bash
npm run ios     # Run on iOS
npm run android # Run on Android
npm run web     # Run on web browser
```

## Development

### Testing

Run tests:

```bash
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Code Quality

```bash
npm run lint      # Run ESLint
npm run lint:fix  # Fix ESLint issues
npm run format    # Format code with Prettier
```

### Type Checking

```bash
npm run type-check # Run TypeScript type checking
```

## Dependencies

- React Native
- Expo
- TypeScript
- Jest for testing
- ESLint for linting
- Prettier for code formatting

## Contributing

1. Create a new branch for your feature
2. Write tests for new functionality
3. Ensure all tests pass
4. Submit a pull request

## License

MIT
