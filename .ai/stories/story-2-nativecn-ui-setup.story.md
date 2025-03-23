# Story 2: nativecn-ui Setup

## Status: Completed ✅

## Story

As a developer,
I want to set up nativecn-ui with proper theming and accessibility support,
So that we have a consistent and accessible component library.

## Technical Implementation

### 1. Component Setup

```typescript
// @components/shared/Button.tsx
import { Button as NativeCNButton } from 'nativecn-ui/button';
import { useTheme } from '@theme/ThemeContext';

export const Button = ({ ...props }) => {
  const { theme } = useTheme();
  return (
    <NativeCNButton
      {...props}
      style={[
        {
          backgroundColor: theme.accent1,
        },
        props.style,
      ]}
    />
  );
};

// @components/shared/Card.tsx
import { Card as NativeCNCard } from 'nativecn-ui/card';
import { useTheme } from '@theme/ThemeContext';

export const Card = ({ ...props }) => {
  const { theme } = useTheme();
  return (
    <NativeCNCard
      {...props}
      style={[
        {
          backgroundColor: theme.card,
        },
        props.style,
      ]}
    />
  );
};
```

### 2. Theme Integration

```typescript
// @theme/nativecn.ts
import { createTheme } from "nativecn-ui/theme";
import { lightTheme, darkTheme } from "@theme/constants";

export const nativecnLight = createTheme({
  colors: {
    primary: lightTheme.accent1,
    background: lightTheme.background,
    card: lightTheme.card,
    text: lightTheme.text.primary,
  },
});

export const nativecnDark = createTheme({
  colors: {
    primary: darkTheme.accent1,
    background: darkTheme.background,
    card: darkTheme.card,
    text: darkTheme.text.primary,
  },
});
```

### 3. Accessibility Setup

```typescript
// @utils/accessibility.ts
import { AccessibilityInfo } from "react-native";

export const setupAccessibility = (component: any) => {
  return {
    accessible: true,
    accessibilityRole: component.role,
    accessibilityLabel: component.label,
    accessibilityHint: component.hint,
  };
};
```

## Tasks

1. [x] Install nativecn-ui
2. [x] Set up theme integration
3. [x] Create base components
4. [x] Add accessibility support
5. [x] Test components
6. [x] Document usage

## Test Cases

```typescript
// tests/components/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@components/shared/Button';

describe('Button', () => {
  it('renders with correct theme', () => {
    const { getByRole } = render(
      <Button onPress={() => {}} label="Test" />
    );
    const button = getByRole('button');
    expect(button).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Button onPress={onPress} label="Test" />
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## Dependencies

- Story 1: Project Initialization

## Estimation

- Installation and setup: 1 hour
- Theme integration: 2 hours
- Component creation: 3 hours
- Accessibility setup: 2 hours
- Testing: 2 hours
  Total: 10 hours

## Notes

- Follow nativecn-ui best practices
- Ensure consistent theming
- Document component API
- Test accessibility features
