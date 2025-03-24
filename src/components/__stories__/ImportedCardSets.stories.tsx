import React from 'react';
import ImportedCardSets from '@components/ImportedCardSets';
import { CardSetsProvider } from '@contexts/CardSetsContext';
import { CardSetData, CardSetProgress, Category } from '@types';

const mockCardSets: CardSetData[] = [
  {
    id: '1',
    name: 'Basic Conversation',
    description: 'Essential conversation starters',
    totalCards: 100,
    categories: ['Icebreakers', 'Personality'] as Category[],
    image: require('@assets/images/conversation-basic.png'),
  },
  {
    id: '2',
    name: 'Deep Connection',
    description: 'Questions for deeper connections',
    totalCards: 500,
    categories: ['Deep Thoughts', 'Intimacy', 'Growth'] as Category[],
    image: require('@assets/images/deep-connection.png'),
  },
];

const mockProgress: Record<string, CardSetProgress> = {
  '1': {
    totalSeen: 50,
    totalCards: 100,
    seenByCategory: {
      Icebreakers: 30,
      Personality: 20,
    } as Record<Category, number>,
  },
  '2': {
    totalSeen: 200,
    totalCards: 500,
    seenByCategory: {
      'Deep Thoughts': 80,
      Intimacy: 70,
      Growth: 50,
    } as Record<Category, number>,
  },
};

export default {
  title: 'Components/ImportedCardSets',
  component: ImportedCardSets,
  decorators: [
    (Story: React.ComponentType) => (
      <CardSetsProvider>
        <Story />
      </CardSetsProvider>
    ),
  ],
};

export const Default = () => (
  <ImportedCardSets
    cardSets={mockCardSets}
    progress={mockProgress}
    onCardSetPress={id => console.log('Card set pressed:', id)}
  />
);

export const WithMockedData = () => (
  <ImportedCardSets
    cardSets={mockCardSets}
    progress={mockProgress}
    onCardSetPress={id => console.log('Card set pressed:', id)}
  />
);
