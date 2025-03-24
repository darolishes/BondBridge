import React, { memo } from 'react';
import { View } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import { useTheme } from '@theme/theme-context';
import type { CardProps } from './card.types';
import { cardStyles } from './card.styles';

export const Card = memo<CardProps>(
  ({ title, children, style, onPress, loading, testID, ...props }) => {
    const { theme } = useTheme();

    if (loading) {
      return (
        <PaperCard
          testID={testID ? `${testID}-loading` : 'card-loading'}
          style={[cardStyles.container, style]}
        >
          <View style={cardStyles.loadingPlaceholder} />
        </PaperCard>
      );
    }

    return (
      <PaperCard
        testID={testID}
        style={[
          cardStyles.container,
          style,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
        onPress={onPress}
        {...props}
      >
        {title && <PaperCard.Title title={title} />}
        {children && <PaperCard.Content style={cardStyles.content}>{children}</PaperCard.Content>}
      </PaperCard>
    );
  }
);
