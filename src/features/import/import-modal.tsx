import React from 'react';
import { View, StyleSheet, ImageSourcePropType } from 'react-native';
import { useTheme } from '@theme/theme-context';
import { ImportButton } from '@features/import/import-button';
import { ImportedCardSets } from '@features/import/imported-card-sets';
import { importCardSet } from '@features/import/import.service';
import type { CardSetData, CardSetProgress, Category, Card } from '@types';

export interface ImportModalProps {
  onClose: () => void;
  testID?: string;
}

export const ImportModal: React.FC<ImportModalProps> = ({ onClose, testID }) => {
  const { theme } = useTheme();
  const [cardSets, setCardSets] = React.useState<CardSetData[]>([]);
  const [progress, setProgress] = React.useState<Record<string, CardSetProgress>>({});

  const handleImport = async () => {
    const result = await importCardSet();
    if (result.success && result.data) {
      const importedSet = result.data;
      const newCardSet: CardSetData = {
        id: importedSet.packageName,
        name: importedSet.packageName,
        description: importedSet.description,
        image: importedSet.image ? ({ uri: importedSet.image } as ImageSourcePropType) : undefined,
        totalCards: importedSet.cards.length,
        categories: Array.from(
          new Set(importedSet.cards.map((card: Card) => card.category as Category))
        ),
      };
      setCardSets(prev => [...prev, newCardSet]);
      onClose();
    }
    return result;
  };

  const handleCardSetPress = (id: string) => {
    // Handle card set selection
    console.log('Selected card set:', id);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}
      testID={testID}
    >
      <ImportButton onPress={handleImport} />
      <ImportedCardSets
        cardSets={cardSets}
        progress={progress}
        onCardSetPress={handleCardSetPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
