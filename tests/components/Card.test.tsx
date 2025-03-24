import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@theme/ThemeProvider';
import Card from '../Card';
import '../../../i18n/i18n';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Card', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <TestWrapper>
        <Card title="Test Card">
          <Text>Card Content</Text>
        </Card>
      </TestWrapper>
    );

    expect(getByText('Test Card')).toBeTruthy();
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper>
        <Card onPress={onPress} testID="pressable-card">
          <Text>Pressable Card</Text>
        </Card>
      </TestWrapper>
    );

    fireEvent.press(getByTestId('pressable-card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies different modes correctly', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Card mode="outlined" testID="outlined-card">
          <Text>Outlined Card</Text>
        </Card>
      </TestWrapper>
    );

    const card = getByTestId('outlined-card');
    expect(card.props.mode).toBe('outlined');
  });

  it('applies accessibility props', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Card
          testID="accessible-card"
          accessibility={{
            label: 'Accessible Card',
            hint: 'This is an accessible card',
          }}
        >
          <Text>Accessible Content</Text>
        </Card>
      </TestWrapper>
    );

    const card = getByTestId('accessible-card');
    expect(card.props.accessibilityLabel).toBe('Accessible Card');
    expect(card.props.accessibilityHint).toBe('This is an accessible card');
  });

  it('renders card title with proper accessibility', () => {
    const { getByText } = render(
      <TestWrapper>
        <Card title="Accessible Title">
          <Text>Content</Text>
        </Card>
      </TestWrapper>
    );

    const title = getByText('Accessible Title');
    expect(title.parent.props.accessibilityRole).toBe('header');
    expect(title.parent.props.accessibilityHeading).toBe(true);
  });
});
