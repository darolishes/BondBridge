# Testing Strategy

Version: 1.1.0
Last Updated: 2025-03-26 10:38:52
Status: 🟢 Active
Related Files: systemPatterns.md, decisionLog.md, technical-debt.md

## Testing Levels 🎯

### Unit Testing

- Framework: Jest
- Coverage target: 80%
- Focus areas:
  - Utility functions
  - Custom hooks
  - Redux reducers and selectors
  - Helper functions
  - TypeScript type validation

### Component Testing

- Framework: React Native Testing Library
- Coverage target: 90%
- Focus areas:
  - UI components
  - Screen components
  - Navigation flows
  - User interactions
  - Accessibility features

### Animation & Gesture Testing

- Framework: Jest + React Native Testing Library + Reanimated test utils
- Coverage target: 70%
- Focus areas:
  - Card swiping gestures
  - Animated transitions
  - Touch interaction handling
  - Performance metrics

### Integration Testing

- Framework: Jest + React Native Testing Library + Redux Mock Store
- Coverage target: 70%
- Focus areas:
  - Redux store integration
  - AsyncStorage persistence
  - Navigation flows
  - Feature interactions

### E2E Testing

- Framework: Detox
- Coverage target: 50%
- Focus areas:
  - Critical user flows
  - Performance scenarios
  - Edge cases
  - Platform-specific features
  - Dark mode / theme switching

## Test Organization 📁

### Directory Structure

```
/src
├── features/
│   ├── featureA/
│   │   ├── __tests__/
│   │   │   ├── unit/
│   │   │   └── components/
│   │   ├── ...feature code
├── common/
│   ├── __tests__/
│   │   ├── unit/
│   │   └── components/
│   ├── ...common code
└── e2e/
    ├── flows/
    └── helpers/
```

### Naming Convention

- Unit tests: `*.test.ts`
- Component tests: `*.spec.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.ts`
- Test utilities: `*.test.utils.ts`

## Testing Utilities 🧰

### Custom Testing Hooks

```typescript
// Example of animation testing utility
import { withReanimatedTimer } from "react-native-reanimated/lib/reanimated2/jestUtils";

export const runAnimationTest = (testFn: () => void) => {
  withReanimatedTimer(() => {
    testFn();
  });
};

// Example of gesture testing utility
export const simulateSwipe = async (
  element: ReactTestInstance,
  direction: "left" | "right"
) => {
  const startX = direction === "left" ? 300 : 100;
  const endX = direction === "left" ? 100 : 300;

  fireEvent(element, "onGestureEvent", {
    nativeEvent: { x: startX, y: 150 },
  });

  // Simulate movement
  for (let i = 1; i <= 5; i++) {
    const currentX = startX + ((endX - startX) / 5) * i;
    await act(async () => {
      fireEvent(element, "onGestureEvent", {
        nativeEvent: { x: currentX, y: 150 },
      });
    });
  }

  // End gesture
  fireEvent(element, "onHandlerStateChange", {
    nativeEvent: {
      state: State.END,
      x: endX,
      y: 150,
    },
  });
};
```

### Mock System

- Redux store mocks
- Navigation mocks
- AsyncStorage mocks
- Gesture handler mocks
- Device info mocks

## CI/CD Integration 🔄

### Pull Requests

- Run unit tests
- Run component tests
- Check coverage thresholds
- Lint checking
- Type checking
- Bundle size analysis

### Release Pipeline

- Run all test suites
- Performance benchmarks on sample devices
- E2E test suite
- Visual regression tests
- Accessibility audits

## Quality Gates ✅

### Coverage Thresholds

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### Performance Metrics

- Animation frame rate (target: 60fps)
- Memory usage during animations
- Gesture response time
- App startup time on target devices

## Testing Challenges & Solutions 🔍

### Animation Testing

- Challenge: Testing animated values and transitions
- Solution: Use Reanimated test utilities and snapshot comparison

### Gesture Testing

- Challenge: Simulating complex gesture interactions
- Solution: Custom gesture simulation utilities and mock PanResponder

### Async Operations

- Challenge: Testing async flows with Redux and AsyncStorage
- Solution: Mock timers and waitFor utilities

### Device-Specific Behavior

- Challenge: Testing across different device capabilities
- Solution: Device info mocks and platform-specific test cases
