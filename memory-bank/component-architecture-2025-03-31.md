# BondBridge Component Architecture - 2025-03-31

## 1. Component Structure Best Practices

### Recommended Directory Structure

```
app/
  @/                      # Alias directory for shared resources
    components/           # Shared components
      ui/                 # UI primitives
        Button.tsx
        Card.tsx
        Text.tsx
        Input.tsx
      layout/             # Layout components
        Container.tsx
        Stack.tsx
        Grid.tsx
      navigation/         # Navigation components
        TabBar.tsx
        Header.tsx
      cards/              # Card-specific components
        CardView.tsx
        CardStack.tsx
        SwipeIndicator.tsx
      feedback/           # User feedback components
        LoadingIndicator.tsx
        ErrorMessage.tsx
      animations/         # Animation components
        Transition.tsx
        FadeIn.tsx
    hooks/               # Custom hooks
    utils/               # Utility functions
    styles/              # Style definitions
      theme.ts
      typography.ts
      spacing.ts
```

### Component Organization Principles

1. **Atomic Design Methodology**

   - Atoms: Basic UI elements (Button, Text, Input)
   - Molecules: Simple component combinations (Card, FormField)
   - Organisms: Complex UI sections (CardStack, FilterPanel)
   - Templates: Page layouts (ScreenLayout)
   - Pages: Full screens (CardScreen, SettingsScreen)

2. **Component Composition Over Inheritance**

   - Build complex components by composing simpler ones
   - Use React's children prop for flexible composition
   - Implement render props for dynamic content

3. **Single Responsibility Principle**
   - Each component should do one thing well
   - Separate business logic from presentation
   - Use custom hooks for reusable logic

## 2. Critical Dependencies (2025 Best Practices)

### Core Dependencies

| Dependency                   | Purpose            | Advantages                      | Version |
| ---------------------------- | ------------------ | ------------------------------- | ------- |
| react-native-reanimated      | Animations         | Thread performance, worklets    | ^3.6.0  |
| expo-blur                    | UI effects         | Native blur effects             | ^12.9.0 |
| expo-linear-gradient         | UI styling         | Gradient backgrounds            | ^12.7.0 |
| zustand                      | State management   | Simple API, minimal boilerplate | ^4.4.7  |
| zod                          | Runtime validation | Type safety, error messages     | ^3.22.4 |
| react-native-gesture-handler | Gestures           | Native-driven gestures          | ^2.14.0 |
| expo-haptics                 | Feedback           | Tactile feedback                | ^12.6.0 |

### UI Component Libraries

| Library            | Focus             | Bundle Size | Customization |
| ------------------ | ----------------- | ----------- | ------------- |
| NativeWind         | Utility-first CSS | Medium      | High          |
| Tamagui            | Performance       | Small       | Medium        |
| React Native Paper | Material Design   | Large       | Medium        |
| Restyle            | Type safety       | Small       | High          |

### Recommended Choice: NativeWind

NativeWind provides the best balance of developer experience, performance, and customization for BondBridge:

```bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
```

Configuration:

```js
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#8B5CF6',
        // Card categories
        icebreakers: '#60A5FA',
        confessions: '#F87171',
        personality: '#34D399',
        'deep-thoughts': '#8B5CF6',
        intimacy: '#EC4899',
        growth: '#FBBF24',
      },
    },
  },
  plugins: [],
};
```

## 3. Component Implementation Best Practices

### Performance Optimization

1. **Memoization**

   ```tsx
   import { memo } from 'react';

   interface CardProps {
     question: string;
     category: CardCategory;
     onSwipe: (direction: 'left' | 'right') => void;
   }

   const Card = memo(({ question, category, onSwipe }: CardProps) => {
     // Component implementation
   });
   ```

2. **List Virtualization**

   ```tsx
   import { FlashList } from '@shopify/flash-list';

   const CardList = ({ cards }) => (
     <FlashList
       data={cards}
       renderItem={({ item }) => <Card {...item} />}
       estimatedItemSize={300}
       keyExtractor={(item) => item.id}
     />
   );
   ```

3. **Lazy Loading**

   ```tsx
   import { lazy, Suspense } from 'react';

   const CardDetails = lazy(() => import('./CardDetails'));

   const CardView = () => (
     <Suspense fallback={<LoadingIndicator />}>
       <CardDetails />
     </Suspense>
   );
   ```

### Accessibility Best Practices

1. **Screen Reader Support**

   ```tsx
   <Pressable
     accessible={true}
     accessibilityLabel="Conversation card about relationships"
     accessibilityHint="Swipe right to keep, left to skip"
     onPress={handlePress}
   >
     <Text>{question}</Text>
   </Pressable>
   ```

2. **Focus Management**

   ```tsx
   import { useRef, useEffect } from 'react';
   import { View } from 'react-native';

   const FocusableComponent = () => {
     const ref = useRef(null);

     useEffect(() => {
       ref.current?.focus();
     }, []);

     return <View ref={ref} accessible={true} />;
   };
   ```

3. **Color Contrast**
   ```tsx
   // theme.ts
   export const colors = {
     text: {
       primary: '#000000', // WCAG AAA on light backgrounds
       secondary: '#595959', // WCAG AA on light backgrounds
       inverse: '#FFFFFF', // For dark backgrounds
     },
     background: {
       primary: '#FFFFFF',
       secondary: '#F3F4F6',
       accent: '#3B82F6',
     },
   };
   ```

## 4. Style Management Architecture

### Centralized Theme System

```tsx
// app/@/styles/theme.ts
export const theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    // Category colors
    categories: {
      icebreakers: '#60A5FA',
      confessions: '#F87171',
      // ...other categories
    },
    // UI colors
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System-Medium',
      bold: 'System-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  // Animation presets
  animation: {
    durations: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easings: {
      easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
      spring: 'spring(mass: 1, stiffness: 100, damping: 15)',
    },
  },
};

// Type definitions for theme
export type Theme = typeof theme;
```

### Style Implementation Options

#### 1. NativeWind (Recommended)

```tsx
// app/@/components/ui/Card.tsx
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

interface CardProps {
  question: string;
  category: CardCategory;
  onPress?: () => void;
}

export function Card({ question, category, onPress }: CardProps) {
  return (
    <StyledPressable
      className="p-6 rounded-xl bg-white shadow-md"
      style={{ backgroundColor: `bg-${category}` }}
      onPress={onPress}
    >
      <StyledText className="text-lg font-medium text-gray-900">
        {question}
      </StyledText>
    </StyledPressable>
  );
}
```

#### 2. StyleSheet API with Theme

```tsx
// app/@/components/ui/Card.tsx
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '../../styles/theme';

interface CardProps {
  question: string;
  category: CardCategory;
  onPress?: () => void;
}

export function Card({ question, category, onPress }: CardProps) {
  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: theme.colors.categories[category] },
      ]}
      onPress={onPress}
    >
      <Text style={styles.question}>{question}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
});
```

## 5. Component Design Patterns

### 1. Compound Components

```tsx
// app/@/components/ui/Card/index.tsx
import { createContext, useContext, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

interface CardContextType {
  category: CardCategory;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

interface CardProps {
  children: ReactNode;
  category: CardCategory;
}

function CardRoot({ children, category }: CardProps) {
  return (
    <CardContext.Provider value={{ category }}>
      <View style={styles.card}>{children}</View>
    </CardContext.Provider>
  );
}

function CardQuestion({ children }: { children: ReactNode }) {
  return <Text style={styles.question}>{children}</Text>;
}

function CardFooter({ children }: { children: ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

// Usage:
// <Card category="icebreakers">
//   <Card.Question>What's your favorite memory?</Card.Question>
//   <Card.Footer>Swipe to continue</Card.Footer>
// </Card>

export const Card = Object.assign(CardRoot, {
  Question: CardQuestion,
  Footer: CardFooter,
});

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  footer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.secondary,
  },
});
```

### 2. Render Props

```tsx
// app/@/components/cards/SwipeableCard.tsx
import { ReactNode } from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface SwipeableCardProps {
  children: (animatedStyle: any) => ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
}: SwipeableCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      if (event.translationX > 100) {
        translateX.value = withSpring(500);
        onSwipeRight?.();
      } else if (event.translationX < -100) {
        translateX.value = withSpring(-500);
        onSwipeLeft?.();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${translateX.value / 20}deg` },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      {children(animatedStyle)}
    </PanGestureHandler>
  );
}

// Usage:
// <SwipeableCard onSwipeLeft={handleSkip} onSwipeRight={handleKeep}>
//   {(animatedStyle) => (
//     <Animated.View style={[styles.card, animatedStyle]}>
//       <Text>{question}</Text>
//     </Animated.View>
//   )}
// </SwipeableCard>
```

## 6. Implementation Roadmap

### Phase 1: Foundation (Week 19)

1. Set up component directory structure
2. Implement theme system
3. Create base UI components:
   - Card
   - Button
   - Text
   - Container

### Phase 2: Card Interaction (Week 20)

1. Implement SwipeableCard component
2. Add card stack with animations
3. Create category filtering components
4. Add haptic feedback

### Phase 3: Polish & Optimization (Week 21)

1. Add accessibility features
2. Implement performance optimizations
3. Create error states and loading indicators
4. Add unit and integration tests

## 7. Conclusion & Recommendations

Based on current React Native best practices and the BondBridge project requirements:

1. **Adopt NativeWind** for styling - provides the best balance of developer experience and performance
2. **Implement atomic design** for component organization
3. **Use compound components** for complex UI elements
4. **Optimize early** with memoization and virtualization
5. **Prioritize accessibility** from the beginning
6. **Create a comprehensive theme system** for consistent styling
7. **Separate business logic from UI** using custom hooks

This architecture provides a solid foundation for the BondBridge app while maintaining flexibility for future enhancements.
