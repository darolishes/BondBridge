import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Card } from '../';
import { ConfigProvider } from '@contexts/ConfigContext';
import { Config } from '@contexts/ConfigContext/types';

const mockConfig: Partial<Config> = {
  app: {
    NAME: 'BondBridge',
    SLUG: 'bondbridge',
    VERSION: '1.0.0',
    SCHEME: 'bondbridge',
  },
  components: {
    card: {
      dimensions: {
        width: '100%',
        margin: 8,
      },
      animation: {
        flipDuration: 300,
        swipeThreshold: 0.25,
        rotationFactor: 1.5,
      },
      style: {
        borderRadius: 16,
        elevation: 4,
        shadow: {
          color: '#000',
          offset: { width: 0, height: 2 },
          opacity: 0.1,
          radius: 4,
        },
        content: {
          padding: 20,
        },
        loading: {
          height: 100,
          backgroundColor: '#f0f0f0',
        },
      },
    },
  },
};

const renderWithConfig = (component: React.ReactElement) => {
  return render(<ConfigProvider config={mockConfig}>{component}</ConfigProvider>);
};

describe('Card Component', () => {
  it('renders with title', () => {
    const { getByText } = renderWithConfig(
      <Card title="Test Card">
        <Text>Content</Text>
      </Card>
    );

    expect(getByText('Test Card')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });

  it('renders loading state', () => {
    const { getByTestId } = renderWithConfig(
      <Card title="Test Card" isLoading testID="test-card">
        <Text>Content</Text>
      </Card>
    );

    const card = getByTestId('test-card');
    expect(card).toHaveStyle({
      height: mockConfig.components.card.style.loading.height,
      backgroundColor: mockConfig.components.card.style.loading.backgroundColor,
    });
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithConfig(
      <Card title="Test Card" onPress={onPress} testID="test-card">
        <Text>Content</Text>
      </Card>
    );

    fireEvent.press(getByTestId('test-card'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders with different modes', () => {
    const { getByTestId, rerender } = renderWithConfig(
      <Card title="Test Card" mode="elevated" testID="test-card">
        <Text>Content</Text>
      </Card>
    );

    expect(getByTestId('test-card')).toHaveStyle({
      elevation: mockConfig.components.card.style.elevation,
    });

    rerender(
      <ConfigProvider config={mockConfig}>
        <Card title="Test Card" mode="outlined" testID="test-card">
          <Text>Content</Text>
        </Card>
      </ConfigProvider>
    );

    expect(getByTestId('test-card')).toHaveStyle({
      borderWidth: 1,
    });

    rerender(
      <ConfigProvider config={mockConfig}>
        <Card title="Test Card" mode="contained" testID="test-card">
          <Text>Content</Text>
        </Card>
      </ConfigProvider>
    );

    expect(getByTestId('test-card')).toHaveStyle({
      backgroundColor: '#fff',
    });
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = renderWithConfig(
      <Card title="Test Card" style={customStyle} testID="test-card">
        <Text>Content</Text>
      </Card>
    );

    expect(getByTestId('test-card')).toHaveStyle(customStyle);
  });

  it('handles flip animation', () => {
    const { getByTestId, getByText } = renderWithConfig(
      <Card title="Test Card" enableFlip testID="test-card" backContent={<Text>Back Content</Text>}>
        <Text>Front Content</Text>
      </Card>
    );

    const card = getByTestId('test-card');
    expect(getByText('Front Content')).toBeTruthy();

    fireEvent.press(card);
    // Wait for animation
    setTimeout(() => {
      expect(getByText('Back Content')).toBeTruthy();
    }, mockConfig.components.card.animation.flipDuration);
  });

  it('handles swipe gestures', () => {
    const onSwipeLeft = jest.fn();
    const onSwipeRight = jest.fn();
    const { getByTestId } = renderWithConfig(
      <Card
        title="Test Card"
        enableSwipe
        testID="test-card"
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      >
        <Text>Content</Text>
      </Card>
    );

    const card = getByTestId('test-card');
    fireEvent(card, 'onStartShouldSetResponder', {});
    fireEvent(card, 'onResponderGrant', {
      nativeEvent: { locationX: 0, locationY: 0 },
    });
    fireEvent(card, 'onResponderMove', {
      nativeEvent: { locationX: 200, locationY: 0 },
    });
    fireEvent(card, 'onResponderRelease', {});

    expect(onSwipeRight).toHaveBeenCalled();

    fireEvent(card, 'onStartShouldSetResponder', {});
    fireEvent(card, 'onResponderGrant', {
      nativeEvent: { locationX: 200, locationY: 0 },
    });
    fireEvent(card, 'onResponderMove', {
      nativeEvent: { locationX: 0, locationY: 0 },
    });
    fireEvent(card, 'onResponderRelease', {});

    expect(onSwipeLeft).toHaveBeenCalled();
  });

  it('applies accessibility props', () => {
    const accessibility = {
      role: 'button' as const,
      label: 'Test Card',
      hint: 'Press to flip',
    };

    const { getByTestId } = renderWithConfig(
      <Card title="Test Card" testID="test-card" accessibility={accessibility}>
        <Text>Content</Text>
      </Card>
    );

    const card = getByTestId('test-card');
    expect(card.props.accessibilityRole).toBe(accessibility.role);
    expect(card.props.accessibilityLabel).toBe(accessibility.label);
    expect(card.props.accessibilityHint).toBe(accessibility.hint);
  });

  it('warns when no title or children provided', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    renderWithConfig(<Card title="Empty Card" />);
    expect(consoleSpy).toHaveBeenCalledWith('Card: Either children or title prop must be provided');
    consoleSpy.mockRestore();
  });
});
