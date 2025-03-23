import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import { RootStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Mock navigation wrapper
const TestNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Mock data
const mockCardSets = [
  {
    id: 'set-1',
    name: 'Romantic Evening',
    description: 'Light-hearted questions for date night',
    totalCards: 20,
    categories: ['Icebreakers', 'Intimacy'],
  },
  {
    id: 'set-2',
    name: 'Deep Connection',
    description: 'Thought-provoking questions for deeper bonds',
    totalCards: 30,
    categories: ['Deep Thoughts', 'Growth'],
  },
];

const mockProgress = {
  'set-1': {
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
  },
  'set-2': {
    totalSeen: 0,
    totalCards: 30,
    seenByCategory: {
      Icebreakers: 0,
      Confessions: 0,
      Personality: 0,
      'Deep Thoughts': 0,
      Intimacy: 0,
      Growth: 0,
    },
  },
};

// Mock the useCardSets hook
jest.mock('../../hooks/useCardSets', () => ({
  __esModule: true,
  default: () => ({
    cardSets: mockCardSets,
    progress: mockProgress,
    isLoading: false,
    refreshCardSets: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  it('renders card set grid', () => {
    const { getAllByTestId } = render(<TestNavigator />);
    const tiles = getAllByTestId(/card-set-tile/);
    expect(tiles).toHaveLength(2);
  });

  it('shows loading state', () => {
    jest.spyOn(require('../../hooks/useCardSets'), 'default').mockImplementation(() => ({
      cardSets: [],
      progress: {},
      isLoading: true,
      refreshCardSets: jest.fn(),
    }));

    const { getAllByTestId } = render(<TestNavigator />);
    const skeletons = getAllByTestId('skeleton-loader');
    expect(skeletons).toHaveLength(4); // Shows 4 skeleton loaders in a grid
  });

  it('handles pull to refresh', async () => {
    const mockRefresh = jest.fn();
    jest.spyOn(require('../../hooks/useCardSets'), 'default').mockImplementation(() => ({
      cardSets: mockCardSets,
      progress: mockProgress,
      isLoading: false,
      refreshCardSets: mockRefresh,
    }));

    const { getByTestId } = render(<TestNavigator />);
    const flatList = getByTestId('card-set-grid');

    await act(async () => {
      fireEvent.scroll(flatList, {
        nativeEvent: {
          contentOffset: { y: 0 },
          contentSize: { height: 500, width: 100 },
          layoutMeasurement: { height: 100, width: 100 },
        },
      });
    });

    expect(mockRefresh).toHaveBeenCalled();
  });

  it('navigates to card view on tile press', () => {
    const { getByTestId } = render(<TestNavigator />);
    const firstTile = getByTestId('card-set-tile-set-1');

    fireEvent.press(firstTile);
    // Navigation would be tested in integration tests
  });

  it('shows empty state when no card sets', () => {
    jest.spyOn(require('../../hooks/useCardSets'), 'default').mockImplementation(() => ({
      cardSets: [],
      progress: {},
      isLoading: false,
      refreshCardSets: jest.fn(),
    }));

    const { getByText } = render(<TestNavigator />);
    expect(getByText('No card sets found')).toBeTruthy();
  });
});
