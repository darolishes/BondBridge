import React from 'react';
import { ImportedCardSets } from '../ImportedCardSets';
import { CardSetsProvider } from '../../contexts/CardSetsContext';

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

export const Default = () => <ImportedCardSets />;

export const WithMockedData = () => {
  // Mock implementation will be provided by the CardSetsProvider
  return <ImportedCardSets />;
};
