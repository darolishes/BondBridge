# Architecture Document

*BondBridge: Technical Architecture Overview*

Last Updated: 2025-03-31

## Technology Stack

- **Framework**: React Native with Expo
- **State Management**: Zustand
- **Type Validation**: Zod
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Animation**: React Native Reanimated
- **Gesture Handling**: React Native Gesture Handler
- **Storage**: Async Storage for local data

## Component Architecture

### Directory Structure

```
app/
  @/                      # Alias directory for shared resources
    components/           # Shared components
      ui/                 # UI primitives
      layout/             # Layout components
      navigation/         # Navigation components
      cards/              # Card-specific components
      feedback/           # User feedback components
      animations/         # Animation components
    hooks/               # Custom hooks
    utils/               # Utility functions
    styles/              # Style definitions
      theme.ts
```

### Core Dependencies

| Dependency | Purpose | Version |
|------------|---------|---------|
| react-native-reanimated | Animations | ^3.6.0 |
| zustand | State management | ^4.4.7 |
| zod | Runtime validation | ^3.22.4 |
| react-native-gesture-handler | Gestures | ^2.14.0 |
| nativewind | Styling | ^2.0.0 |
| expo-haptics | Tactile feedback | ^12.6.0 |

## Design Patterns

### 1. Atomic Design Methodology

Components organized following atomic design principles:
- **Atoms**: Basic UI elements (Button, Text)
- **Molecules**: Simple combinations (Card, FormField)
- **Organisms**: Complex sections (CardStack, FilterPanel)
- **Templates**: Page layouts (ScreenLayout)
- **Pages**: Full screens (CardScreen, Settings)

### 2. Component Composition

Emphasizing composition over inheritance with patterns like:
- Compound components for related UI elements
- Render props for flexible, dynamic content
- Custom hooks for shared logic

### 3. Style Management

Centralized theme system with NativeWind implementation:

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

## Key Implementation Areas

### 1. Card Interaction System

- SwipeableCard component using gesture handlers
- Card stack with animation transitions
- Haptic feedback integration

### 2. Offline Data Management

- Local storage of card sets
- JSON parsing and validation
- Fallback mechanisms for connectivity issues

### 3. Performance Optimizations

- Component memoization
- List virtualization with FlashList
- Lazy loading for non-critical components

### 4. Accessibility

- Screen reader support
- Focus management
- Color contrast compliance
- Haptic feedback alternatives

## Development Roadmap

### Phase 1: Foundation (Week 19)
- Component structure setup
- Theme implementation
- Base UI components

### Phase 2: Card Interaction (Week 20)
- SwipeableCard component
- Card stack with animations
- Category filtering
- Haptic feedback

### Phase 3: Polish & Optimization (Week 21)
- Accessibility features
- Performance optimizations
- Error states and loading indicators
- Testing

---

*Document History:*
- 2025-03-31: Initial document created