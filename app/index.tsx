import React from 'react';
import { View, FlatList, TouchableOpacity, Text, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useCardSets } from '@hooks/use-card-sets';
import { useTheme, useThemedValue } from '@theme/theme-context';
import CardSetTile from '@components/card/card-set-tile';
import ThemeToggle from '@components/common/theme-toggle';
import type { CardSetData, Category } from '@types';
import { WelcomeState } from './components/welcome-state';
import { styles } from './styles';

const CATEGORIES: Record<Category, number> = {
  Icebreakers: 0,
  Confessions: 0,
  Personality: 0,
  'Deep Thoughts': 0,
  Intimacy: 0,
  Growth: 0,
};

const NUM_COLUMNS = 2;
const DEFAULT_SEEN_CARDS = 5;

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const { cardSets, isLoading, refreshing, handleRefresh, handleImport } = useCardSets();
  const containerStyle = [styles.container, { backgroundColor: theme.colors.background }];

  const emptyStateMessage = useThemedValue(
    'Deine Beziehungs-Lernreise beginnt hier!',
    'Deine Beziehungs-Lernreise beginnt hier im Dunkelmodus!'
  );

  const renderItem = React.useCallback(
    ({ item }: { item: CardSetData }) => {
      const progress = { ...CATEGORIES };
      if (item.categories[0]) {
        progress[item.categories[0] as Category] = DEFAULT_SEEN_CARDS;
      }

      return (
        <CardSetTile
          item={item}
          onPress={(id: string) => router.push(`/cardview/${id}`)}
          progress={{
            totalSeen: item.categories[0] ? DEFAULT_SEEN_CARDS : 0,
            totalCards: item.totalCards,
            seenByCategory: progress,
          }}
        />
      );
    },
    [router]
  );

  if (isLoading) {
    return (
      <WelcomeState
        title="Loading..."
        icon="hourglass-outline"
        showThemeToggle={false}
        style={containerStyle}
      />
    );
  }

  if (!cardSets?.length) {
    return (
      <WelcomeState
        title="Willkommen bei BondBridge"
        message={emptyStateMessage}
        style={containerStyle}
      />
    );
  }

  return (
    <View style={containerStyle}>
      <FlatList
        data={cardSets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={NUM_COLUMNS}
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
