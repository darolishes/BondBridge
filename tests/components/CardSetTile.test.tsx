import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardSetTile from '../CardSetTile';
import { CardSetData, CardSetProgress } from '../../types/cardSet';

const mockCardSet: CardSetData = {
  id: 'test-set-1',
  name: 'Romantic Evening',
  description: 'Light-hearted questions for date night',
  totalCards: 20,
  categories: ['Icebreakers', 'Intimacy'],
};

const mockProgress: CardSetProgress = {
  totalSeen: 5,
  totalCards: 20,
  seenByCategory: {
    Icebreakers: 3,
    Confessions: 0,
    Personality: 0,
    'Deep Thoughts': 0,
    Intimacy: 2,
    Growth: 0,
  },
};

describe('CardSetTile', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <CardSetTile
        cardSet={mockCardSet}
        progress={mockProgress}
        onPress={mockOnPress}
        testID="card-set-tile"
      />
    );

    expect(getByText('Romantic Evening')).toBeTruthy();
    expect(getByText('Light-hearted questions for date night')).toBeTruthy();
    expect(getByTestId('progress-indicator')).toBeTruthy();
  });

  it('displays correct progress', () => {
    const { getByText } = render(
      <CardSetTile cardSet={mockCardSet} progress={mockProgress} onPress={mockOnPress} />
    );

    expect(getByText('5/20')).toBeTruthy();
  });

  it('handles press events', () => {
    const { getByTestId } = render(
      <CardSetTile
        cardSet={mockCardSet}
        progress={mockProgress}
        onPress={mockOnPress}
        testID="card-set-tile"
      />
    );

    fireEvent.press(getByTestId('card-set-tile'));
    expect(mockOnPress).toHaveBeenCalledWith('test-set-1');
  });

  it('shows loading state', () => {
    const { getByTestId } = render(
      <CardSetTile
        cardSet={mockCardSet}
        progress={mockProgress}
        onPress={mockOnPress}
        isLoading={true}
      />
    );

    expect(getByTestId('skeleton-loader')).toBeTruthy();
  });

  it('handles missing image gracefully', () => {
    const { getByTestId } = render(
      <CardSetTile
        cardSet={{ ...mockCardSet, image: undefined }}
        progress={mockProgress}
        onPress={mockOnPress}
      />
    );

    expect(getByTestId('default-image')).toBeTruthy();
  });
});
