# BondBridge

A React Native application built with Expo and TypeScript.

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── screens/       # Screen components
  ├── hooks/         # Custom React hooks
  ├── utils/         # Utility functions
  ├── services/      # API and service integrations
  ├── types/         # TypeScript type definitions
  ├── constants/     # Constants and configuration
  ├── assets/        # Static assets
  └── tests/         # Test files
```

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
