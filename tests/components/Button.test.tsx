import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@theme/ThemeProvider';
import Button from '@components/Button';
import '../../../i18n/i18n';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <TestWrapper>
        <Button onPress={() => {}}>Test Button</Button>
      </TestWrapper>
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper>
        <Button onPress={onPress}>Press Me</Button>
      </TestWrapper>
    );

    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Button onPress={() => {}} loading testID="loading-button">
          Loading Button
        </Button>
      </TestWrapper>
    );

    expect(getByTestId('loading-button')).toBeTruthy();
  });

  it('respects disabled state', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper>
        <Button onPress={onPress} disabled>
          Disabled Button
        </Button>
      </TestWrapper>
    );

    fireEvent.press(getByText('Disabled Button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
