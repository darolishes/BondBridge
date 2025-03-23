# Story 3: Theme Customization

## Status: Completed ✅

## Story

As a user,
I want to have a consistent and customizable theme across the app,
So that I can use the app comfortably in different lighting conditions.

## Technical Implementation

### 1. Theme Context

```typescript
// @theme/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "@theme/constants";

export const ThemeContext = createContext({
  isDark: false,
  isSystemTheme: true,
  theme: lightTheme,
  toggleTheme: () => {},
  setSystemTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
```

### 2. Theme Constants

```typescript
// @theme/constants.ts
export const lightTheme = {
  background: "#FFF5E1",
  card: "#FFFFFF",
  accent1: "#FFC1CC",
  accent2: "#FF9999",
  text: {
    primary: "#333333",
    secondary: "#666666",
  },
};

export const darkTheme = {
  background: "#2D2D2D",
  card: "#424242",
  accent1: "#FFAAAA",
  accent2: "#FF9999",
  text: {
    primary: "#E0E0E0",
    secondary: "#CCCCCC",
  },
};
```

### 3. Theme Hook

```typescript
// @hooks/useThemedStyles.ts
import { useTheme } from "@theme/ThemeContext";
import { StyleSheet } from "react-native";

export const useThemedStyles = <T extends {}>(
  styleFactory: (theme: Theme) => T
) => {
  const { theme } = useTheme();
  return StyleSheet.create(styleFactory(theme));
};
```

## Tasks

1. [x] Set up theme context
2. [x] Create theme constants
3. [x] Implement theme hook
4. [x] Add system theme support
5. [x] Create theme toggle
6. [x] Add dark mode styles
7. [x] Test theme switching

## Test Cases

```typescript
// tests/theme/ThemeContext.test.tsx
import { renderHook } from "@testing-library/react-native";
import { useTheme } from "@theme/ThemeContext";
import { lightTheme, darkTheme } from "@theme/constants";

describe("ThemeContext", () => {
  it("provides light theme by default", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toEqual(lightTheme);
  });

  it("toggles theme correctly", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toEqual(darkTheme);
  });
});
```

## Dependencies

- Story 1: Project Initialization
- Story 2: nativecn-ui Setup

## Estimation

- Theme context setup: 2 hours
- Theme constants: 1 hour
- Theme hook: 2 hours
- System theme support: 2 hours
- Testing: 2 hours
  Total: 9 hours

## Notes

- Ensure smooth theme transitions
- Test on both iOS and Android
- Document theme API
- Consider adding theme presets
