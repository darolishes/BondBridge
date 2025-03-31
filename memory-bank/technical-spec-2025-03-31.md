# React Native Style Centralization - Technical Specification

## Current Best Practices (2025)

### 1. Core Approaches

- **CSS Variables**: Limited native support, requires workarounds
- **StyleSheet API**: Official React Native solution, good performance
- **CSS-in-JS Libraries**: Popular but adds bundle size
- **Utility-First**: Growing adoption (NativeWind, Tamagui)

### 2. Performance Considerations

| Method        | Performance Impact           |
| ------------- | ---------------------------- |
| StyleSheet    | Best (pre-compiled)          |
| Inline Styles | Medium (runtime computation) |
| CSS-in-JS     | Worst (runtime parsing)      |

### 3. Recommended Libraries

1. **NativeWind** (Tailwind for RN)
2. **Restyle** (TypeScript first)
3. **Styled Components** (Familiar syntax)
4. **Tamagui** (Optimized compiler)

### 4. Implementation Strategy

```typescript
// Recommended theme structure
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    // ...
  };
  spacing: {
    s: number;
    m: number;
    l: number;
  };
  // ...
}

// Usage example
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
  },
});
```

### 5. Migration Steps

1. Audit existing styles
2. Define design tokens
3. Create theme provider
4. Refactor components incrementally
5. Add TypeScript types
