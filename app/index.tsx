import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, RefreshControl } from 'react-native';
import { useCardSets } from '@hooks/useCardSets';
import { useTheme, useThemedValue } from '@theme/ThemeContext';
import { EmptyState } from '@components/common';
import { CardSetTile } from '@components/card';
import { useRouter } from 'expo-router';
import { CardSetData, Category } from '@types';
import ThemeToggle from '@components/common/ThemeToggle';

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const { cardSets, isLoading, refreshing, handleRefresh, handleImport } = useCardSets();
  const numColumns = 2;

  // Use themedValue for dynamic values based on theme
  const emptyStateMessage = useThemedValue(
    'Deine Beziehungs-Lernreise beginnt hier!',
    'Deine Beziehungs-Lernreise beginnt hier im Dunkelmodus!'
  );

  const renderItem = ({ item }: { item: CardSetData }) => {
    const defaultProgress: Record<Category, number> = {
      Icebreakers: 0,
      Confessions: 0,
      Personality: 0,
      'Deep Thoughts': 0,
      Intimacy: 0,
      Growth: 0,
    };

    if (item.categories[0]) {
      defaultProgress[item.categories[0] as Category] = 5;
    }

    return (
      <CardSetTile
        item={item}
        onPress={(id: string) => router.push(`/cardview/${id}`)}
        progress={{
          totalSeen: item.categories[0] ? 5 : 0,
          totalCards: item.totalCards,
          seenByCategory: defaultProgress,
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <EmptyState title="Loading..." icon="hourglass-outline" />
      </View>
    );
  }

  if (!cardSets?.length) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <EmptyState
          title="Willkommen bei BondBridge"
          message={emptyStateMessage}
          icon="heart-outline"
        />
        <View style={styles.themeToggleContainer}>
          <ThemeToggle showLabels enableSystemTheme />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={cardSets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <ThemeToggle size="small" />
          </View>
        }
      />
      <TouchableOpacity
        style={[styles.importButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleImport}
      >
        <Text style={[styles.buttonText, { color: theme.colors.textOnPrimary }]}>
          Kartenset importieren
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  importButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  themeToggleContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
});
