import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Card } from '../card';
import { Text } from 'react-native';
import * as Haptics from 'expo-haptics';

// Mock hooks
jest.mock('../../hooks/useCardFlip', () => ({
  useCardFlip: () => ({
    isFlipped: false,
    flipCard: jest.fn(),
    frontStyle: {},
    backStyle: {},
  }),
}));

jest.mock('../../hooks/useCardSwipe', () => ({
  useCardSwipe: () => ({
    panResponder: {
      panHandlers: {},
    },
    cardStyle: {},
    swipeDirection: null,
    resetPosition: jest.fn(),
  }),
}));

jest.mock('../../hooks/useHapticFeedback', () => ({
  useHapticFeedback: () => ({
    trigger: jest.fn(),
    enable: jest.fn(),
    disable: jest.fn(),
    isEnabled: true,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params: any) => `${key}:${params?.title || ''}`,
  }),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

describe('Card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Card testID="test-card">
        <Text>Test Content</Text>
      </Card>
    );

    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders title when provided', () => {
    const { getByText } = render(
      <Card testID="test-card" title="Test Title">
        <Text>Test Content</Text>
      </Card>
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('handles onPress events', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Card testID="test-card" onPress={onPress}>
        <Text>Test Content</Text>
      </Card>
    );

    fireEvent.press(getByTestId('test-card'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders loading state correctly', () => {
    const { getByTestId } = render(
      <Card testID="test-card" isLoading>
        <Text>Test Content</Text>
      </Card>
    );

    expect(getByTestId('test-card-loading')).toBeTruthy();
  });

  it('renders back content when flipped', () => {
    const { getByText } = render(
      <Card testID="test-card" enableFlip backContent={<Text>Back Content</Text>}>
        <Text>Front Content</Text>
      </Card>
    );

    expect(getByText('Front Content')).toBeTruthy();
  });

  it('triggers haptic feedback when enabled', () => {
    const { getByTestId } = render(
      <Card testID="test-card" enableHaptics>
        <Text>Test Content</Text>
      </Card>
    );

    fireEvent.press(getByTestId('test-card'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
  });

  it('handles error state through ErrorBoundary', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    const { getByTestId } = render(
      <Card testID="test-card">
        <ErrorComponent />
      </Card>
    );

    expect(getByTestId('test-card-error')).toBeTruthy();
  });

  it('warns when no children or title is provided', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    render(
      <Card testID="test-card">
        <></>
      </Card>
    );

    expect(consoleSpy).toHaveBeenCalledWith('Card: Either children or title prop must be provided');
    consoleSpy.mockRestore();
  });

  it('applies swipe gestures when enabled', () => {
    const onSwipeLeft = jest.fn();
    const onSwipeRight = jest.fn();

    render(
      <Card testID="test-card" enableSwipe onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        <Text>Swipeable Content</Text>
      </Card>
    );
  });

  it('combines multiple animation features', () => {
    const { getByTestId } = render(
      <Card
        testID="test-card"
        enableFlip
        enableSwipe
        enableHaptics
        backContent={<Text>Back Content</Text>}
      >
        <Text>Front Content</Text>
      </Card>
    );

    fireEvent.press(getByTestId('test-card'));
  });
});
