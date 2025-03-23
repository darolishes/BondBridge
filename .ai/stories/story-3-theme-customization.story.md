# Story 3: Theme Customization

## Status: Draft

## User Story

As a developer,
I want to implement a comprehensive theme system with dark mode support,
So that the app has a consistent, accessible, and customizable visual appearance.

## Acceptance Criteria

1. Theme system supports light and dark modes
2. Color palette is accessible and consistent
3. Typography system is implemented
4. Spacing and layout system is defined
5. Theme can be customized per component
6. Theme changes are animated smoothly

## Tasks

1. [ ] Implement theme provider

   - [ ] Test: Verify theme context
   - [ ] Test: Verify theme hooks
   - [ ] Test: Verify theme switching
   - [ ] Test: Verify theme persistence

2. [ ] Create color system

   - [ ] Test: Verify color palette
   - [ ] Test: Verify color contrast
   - [ ] Test: Verify dark mode colors
   - [ ] Test: Verify color utilities

3. [ ] Implement typography system

   - [ ] Test: Verify font families
   - [ ] Test: Verify font sizes
   - [ ] Test: Verify line heights
   - [ ] Test: Verify font weights

4. [ ] Create spacing system

   - [ ] Test: Verify spacing scale
   - [ ] Test: Verify layout utilities
   - [ ] Test: Verify responsive spacing

5. [ ] Implement theme animations
   - [ ] Test: Verify theme transition
   - [ ] Test: Verify animation performance
   - [ ] Test: Verify reduced motion support

## Technical Notes

```typescript
// Theme types
interface ThemeColors {
  primary: ColorShades;
  secondary: ColorShades;
  background: ColorShades;
  text: ColorShades;
  success: ColorShades;
  error: ColorShades;
}

interface Typography {
  fontFamily: {
    sans: string;
    heading: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

// Theme hook
export const useTheme = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => createTheme(mode), [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { theme, mode, toggleTheme };
};

// Theme transition
const ThemeTransition: FC = ({ children }) => {
  const { mode } = useTheme();

  return (
    <Animated.View
      style={[
        styles.container,
        useAnimatedStyle(() => ({
          backgroundColor: withTiming(
            mode === "light" ? colors.light : colors.dark
          ),
        })),
      ]}
    >
      {children}
    </Animated.View>
  );
};
```

## Test Cases

```typescript
describe("Theme System", () => {
  describe("Theme Provider", () => {
    it("provides theme context", () => {
      // Test theme context
    });

    it("handles theme switching", () => {
      // Test theme switching
    });
  });

  describe("Color System", () => {
    it("maintains proper contrast", () => {
      // Test color contrast
    });

    it("supports dark mode", () => {
      // Test dark mode colors
    });
  });

  describe("Typography", () => {
    it("applies correct font styles", () => {
      // Test typography
    });

    it("maintains vertical rhythm", () => {
      // Test line heights
    });
  });

  describe("Animations", () => {
    it("animates theme changes smoothly", () => {
      // Test animations
    });

    it("respects reduced motion settings", () => {
      // Test accessibility
    });
  });
});
```

## Time Estimation

- Theme Provider: 3 hours
- Color System: 4 hours
- Typography: 2 hours
- Spacing: 2 hours
- Animations: 3 hours
  Total: 14 hours

## Dependencies

- Story 1: Project Initialization
- Story 2: nativecn-ui Setup

## Related Stories

- Previous: Story 2 - nativecn-ui Setup
- Next: Story 4 - Card Component
