import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useCardSets } from '../contexts/CardSetsContext';
import { ImportButton } from './ImportButton';
import { Toast } from './Toast';
import CardSetTile from './CardSetTile';
import { useCardSetImage } from '../hooks/useCardSetImage';
import type { ImportedCardSet } from '../types/cardSet';

export const ImportedCardSets: React.FC = () => {
  const { importedSets, isLoading, error, importSet, refreshSets } = useCardSets();
  const [toastConfig, setToastConfig] = React.useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const handleImportComplete = (result: {
    success: boolean;
    data?: ImportedCardSet;
    error?: { message: string };
  }) => {
    if (result.success && result.data) {
      setToastConfig({
        visible: true,
        message: `Successfully imported ${result.data.packageName}`,
        type: 'success',
      });
    } else {
      setToastConfig({
        visible: true,
        message: result.error?.message || 'Failed to import card set',
        type: 'error',
      });
    }
  };

  const renderItem = ({ item }: { item: ImportedCardSet }) => {
    const image = useCardSetImage(item.image);
    return (
      <CardSetTile
        cardSet={{
          id: item.packageName,
          name: item.packageName,
          description: item.description,
          image: image,
          totalCards: item.cards.length,
          categories: [...new Set(item.cards.map(card => card.category))],
        }}
        progress={{
          totalSeen: 0,
          totalCards: item.cards.length,
          seenByCategory: {},
        }}
        onPress={() => {}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Imported Card Sets</Text>
        <ImportButton onImportComplete={handleImportComplete}>
          <Text style={styles.buttonText}>Import New Set</Text>
        </ImportButton>
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={importedSets}
          renderItem={renderItem}
          keyExtractor={item => item.packageName}
          contentContainerStyle={styles.list}
          onRefresh={refreshSets}
          refreshing={isLoading}
        />
      )}

      <Toast
        visible={toastConfig.visible}
        message={toastConfig.message}
        type={toastConfig.type}
        onHide={() => setToastConfig(prev => ({ ...prev, visible: false }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  error: {
    color: '#F44336',
    padding: 16,
    textAlign: 'center',
  },
});
