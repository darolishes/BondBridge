import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/theme-context';
import { Card } from '@features/cards';
import { EmptyState } from '@features/common/empty-state';
import type { CardSetData, CardSetProgress } from '@types';

export interface ImportedCardSetsProps {
  cardSets: CardSetData[];
  progress: Record<string, CardSetProgress>;
  onCardSetPress: (id: string) => void;
}

export const ImportedCardSets: React.FC<ImportedCardSetsProps> = ({
  cardSets,
  progress,
  onCardSetPress,
}) => {
  const { theme } = useTheme();

  if (cardSets.length === 0) {
    return (
      <EmptyState
        title="No Card Sets"
        message="Import some card sets to get started"
        icon="cards-outline"
      />
    );
  }

  return (
    <View style={styles.container}>
      {cardSets.map(cardSet => (
        <Card
          key={cardSet.id}
          title={cardSet.name}
          onPress={() => onCardSetPress(cardSet.id)}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.cardContent}>{/* Card content */}</View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderWidth: 1,
  },
  cardContent: {
    padding: 16,
  },
});
