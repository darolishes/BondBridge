# Card Component

A versatile, animated card component for React Native applications that supports flipping, swiping, and haptic feedback.

## Features 🎯

- Card flipping animation
- Swipe gestures with callbacks
- Haptic feedback integration
- Loading state
- Accessibility support
- Error boundary protection
- Multiple display modes (elevated, outlined, contained)

## Installation 📦

The Card component requires the following dependencies:

```bash
npm install react-native-paper expo-haptics
```

## Basic Usage 🚀

```tsx
import { Card } from '@components/Card';
import { Text } from 'react-native';

// Simple Card with title
const SimpleCard = () => (
  <Card title="Welcome">
    <Text>This is a basic card</Text>
  </Card>
);

// Card with custom styling
const StyledCard = () => (
  <Card style={{ margin: 16 }} contentStyle={{ padding: 16 }} mode="outlined">
    <Text>Custom styled card</Text>
  </Card>
);
```

## Animation Features 🎬

### Flip Animation

```tsx
const FlippableCard = () => (
  <Card enableFlip flipDuration={300} backContent={<Text>Back of the card</Text>}>
    <Text>Front of the card</Text>
  </Card>
);
```

### Swipe Gestures

```tsx
const SwipeableCard = () => (
  <Card
    enableSwipe
    swipeThreshold={120}
    rotationFactor={7}
    onSwipeLeft={() => console.log('Swiped left')}
    onSwipeRight={() => console.log('Swiped right')}
  >
    <Text>Swipe me left or right</Text>
  </Card>
);
```

### Haptic Feedback

```tsx
const InteractiveCard = () => (
  <Card enableHaptics onPress={() => console.log('Card pressed')}>
    <Text>Press for haptic feedback</Text>
  </Card>
);
```

## Combined Features Example 🌟

```tsx
const FeatureRichCard = () => (
  <Card
    title="Interactive Card"
    enableFlip
    enableSwipe
    enableHaptics
    flipDuration={300}
    swipeThreshold={120}
    onSwipeLeft={() => console.log('Swiped left')}
    onSwipeRight={() => console.log('Swiped right')}
    backContent={<Text>You found the back!</Text>}
    style={{ margin: 16 }}
    mode="elevated"
  >
    <Text>Tap to flip, swipe to dismiss</Text>
  </Card>
);
```

## Props 📝

### Base Props

| Prop            | Type                                      | Default      | Description                          |
| --------------- | ----------------------------------------- | ------------ | ------------------------------------ |
| `style`         | `StyleProp<ViewStyle>`                    | -            | Custom styles for the card container |
| `contentStyle`  | `StyleProp<ViewStyle>`                    | -            | Custom styles for the card content   |
| `mode`          | `'elevated' \| 'outlined' \| 'contained'` | `'elevated'` | Card display mode                    |
| `onPress`       | `() => void`                              | -            | Callback when card is pressed        |
| `testID`        | `string`                                  | -            | Test identifier                      |
| `isLoading`     | `boolean`                                 | `false`      | Show loading state                   |
| `accessibility` | `AccessibilityProps`                      | -            | Custom accessibility props           |

### Animation Props

| Prop             | Type              | Default | Description                     |
| ---------------- | ----------------- | ------- | ------------------------------- |
| `enableFlip`     | `boolean`         | `false` | Enable flip animation           |
| `enableSwipe`    | `boolean`         | `false` | Enable swipe gestures           |
| `enableHaptics`  | `boolean`         | `false` | Enable haptic feedback          |
| `flipDuration`   | `number`          | `300`   | Duration of flip animation      |
| `swipeThreshold` | `number`          | `120`   | Distance threshold for swipe    |
| `rotationFactor` | `number`          | `7`     | Rotation intensity during swipe |
| `onSwipeLeft`    | `() => void`      | -       | Callback for left swipe         |
| `onSwipeRight`   | `() => void`      | -       | Callback for right swipe        |
| `backContent`    | `React.ReactNode` | -       | Content to show when flipped    |

## Accessibility ♿️

The Card component includes built-in accessibility features:

- Automatic role assignment
- Custom labels and hints
- Screen reader support
- Interactive state announcements

```tsx
const AccessibleCard = () => (
  <Card
    accessibility={{
      label: 'Interactive card',
      hint: 'Double tap to flip the card',
      role: 'button',
    }}
  >
    <Text>Accessible content</Text>
  </Card>
);
```

## Loading State 🔄

```tsx
const LoadingCard = () => (
  <Card isLoading>
    <Text>Content loads after isLoading is false</Text>
  </Card>
);
```

## Error Handling 🛡️

The Card component is wrapped with an ErrorBoundary to gracefully handle runtime errors:

```tsx
// Error boundary will catch and handle any errors in the card content
const SafeCard = () => (
  <Card>
    <PotentiallyErrorProneComponent />
  </Card>
);
```

## Best Practices 💡

1. Always provide meaningful content or a title
2. Use haptic feedback for important interactions
3. Keep flip animations under 400ms for best UX
4. Provide clear visual feedback for swipe gestures
5. Include accessibility props for better inclusivity
6. Test all interactive features thoroughly

## Performance Tips 🚀

1. Memoize callbacks passed to onSwipeLeft/Right
2. Use appropriate mode based on the card's purpose
3. Avoid deeply nested content in flippable cards
4. Optimize images and heavy content
5. Use testID props for easier testing

## Common Patterns 🎨

### Form Card

```tsx
const FormCard = () => (
  <Card mode="outlined" style={{ margin: 16 }}>
    <TextInput placeholder="Username" />
    <TextInput placeholder="Password" secureTextEntry />
    <Button onPress={handleSubmit}>Submit</Button>
  </Card>
);
```

### Info Card

```tsx
const InfoCard = ({ title, description }) => (
  <Card title={title} mode="elevated" enableHaptics onPress={() => showDetails()}>
    <Text>{description}</Text>
  </Card>
);
```

### Game Card

```tsx
const GameCard = ({ card, onReveal }) => (
  <Card enableFlip enableHaptics backContent={<Text>{card.answer}</Text>} onPress={onReveal}>
    <Text>{card.question}</Text>
  </Card>
);
```
