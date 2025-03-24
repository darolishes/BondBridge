import React from 'react';
import { View } from 'react-native';
import { CardSetImageGrid } from '../CardSetImageGrid';
import { imageLoadTracker } from '../../services/imageLoadTracker';

const CardSetImageGridMeta = {
  title: 'Components/CardSetImageGrid',
  component: CardSetImageGrid,
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    notes: `
      # CardSetImageGrid

      Displays a grid of card set images with loading states and performance metrics.

      ## Features
      - Shows both full-size and thumbnail images
      - Displays loading placeholders
      - Shows error states when images fail to load
      - Tracks and displays performance metrics

      ## Usage
      \`\`\`jsx
      <CardSetImageGrid />
      \`\`\`
    `,
  },
};

export default CardSetImageGridMeta;

export const Default = {
  args: {},
  play: async () => {
    // Reset metrics before story loads
    imageLoadTracker.clearMetrics();
  },
};

export const WithSlowLoading = {
  args: {},
  parameters: {
    mockData: {
      delay: 2000, // Simulate 2s loading time
    },
  },
};

export const WithErrors = {
  args: {},
  parameters: {
    mockData: {
      shouldFail: true, // Simulate loading errors
    },
  },
};
