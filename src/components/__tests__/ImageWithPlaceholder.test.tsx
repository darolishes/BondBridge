import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { ImageWithPlaceholder } from '../ImageWithPlaceholder';

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

describe('ImageWithPlaceholder', () => {
  const mockSource = { uri: 'https://example.com/image.jpg' };
  const mockStyle = { width: 100, height: 100 };

  it('renders loading state initially', () => {
    const { getByTestId } = render(<ImageWithPlaceholder source={mockSource} style={mockStyle} />);

    expect(getByTestId('image-placeholder')).toBeTruthy();
  });

  it('shows image after loading', () => {
    const { getByTestId } = render(<ImageWithPlaceholder source={mockSource} style={mockStyle} />);

    act(() => {
      fireEvent(getByTestId('image'), 'loadEnd');
    });

    expect(getByTestId('image')).toBeTruthy();
    expect(() => getByTestId('image-placeholder')).toThrow();
  });

  it('shows error state on load error', () => {
    const { getByTestId } = render(<ImageWithPlaceholder source={mockSource} style={mockStyle} />);

    act(() => {
      fireEvent(getByTestId('image'), 'error', {
        nativeEvent: { error: 'Failed to load image' },
      });
    });

    expect(getByTestId('image-error')).toBeTruthy();
  });

  it('calls onLoadStart callback', () => {
    const onLoadStart = jest.fn();
    const { getByTestId } = render(
      <ImageWithPlaceholder source={mockSource} style={mockStyle} onLoadStart={onLoadStart} />
    );

    act(() => {
      fireEvent(getByTestId('image'), 'loadStart');
    });

    expect(onLoadStart).toHaveBeenCalled();
  });

  it('calls onLoadEnd callback', () => {
    const onLoadEnd = jest.fn();
    const { getByTestId } = render(
      <ImageWithPlaceholder source={mockSource} style={mockStyle} onLoadEnd={onLoadEnd} />
    );

    act(() => {
      fireEvent(getByTestId('image'), 'loadEnd');
    });

    expect(onLoadEnd).toHaveBeenCalled();
  });

  it('calls onError callback with error object', () => {
    const onError = jest.fn();
    const { getByTestId } = render(
      <ImageWithPlaceholder source={mockSource} style={mockStyle} onError={onError} />
    );

    act(() => {
      fireEvent(getByTestId('image'), 'error', {
        nativeEvent: { error: 'Failed to load image' },
      });
    });

    expect(onError).toHaveBeenCalledWith(new Error('Failed to load image'));
  });
});
