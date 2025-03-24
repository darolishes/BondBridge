import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { CardSetTile } from '@components/card';
import { EmptyState } from '@components/common';
import { CardSetData, CardSetProgress } from '@types';

interface ImportedCardSetsProps {
  cardSets: CardSetData[];
  progress: Record<string, CardSetProgress>;
  onCardSetPress: (id: string) => void;
}

const ImportedCardSets: React.FC<ImportedCardSetsProps> = ({
  cardSets,
  progress,
  onCardSetPress,
}) => {
  const { theme } = useTheme();

  if (cardSets.length === 0) {
    return (
      <EmptyState
        title="No Card Sets"
        message="Import your first card set to get started"
        icon="folder-open-outline"
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {cardSets.map(cardSet => (
        <CardSetTile
          key={cardSet.id}
          item={cardSet}
          progress={progress[cardSet.id]}
          onPress={onCardSetPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
});

export default ImportedCardSets;
