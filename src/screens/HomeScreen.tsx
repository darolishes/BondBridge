import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, CardSetData } from '@types';
import CardSetTile from '@components/CardSetTile';
import EmptyState from '@components/EmptyState';
import useCardSets from '@hooks/useCardSets';
import { useTheme } from '@theme/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const defaultSeenByCategory = {
  Icebreakers: 0,
  Confessions: 0,
  Personality: 0,
  'Deep Thoughts': 0,
  Intimacy: 0,
  Growth: 0,
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { width } = useWindowDimensions();
  const { cardSets, progress, isLoading, error, refreshCardSets } = useCardSets();
  const { theme, isDark } = useTheme();

  const renderItem = ({ item }: { item: CardSetData }) => (
    <CardSetTile
      cardSet={item}
      progress={progress[item.id]}
      onPress={setId => navigation.navigate('CardView', { setId })}
      testID={`card-set-tile-${item.id}`}
      isLoading={isLoading}
    />
  );

  const renderEmptyComponent = () => {
    if (error) {
      return (
        <View style={[styles.errorContainer, { padding: theme.spacing.md }]}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
            onPress={refreshCardSets}
            testID="retry-button"
          >
            <Text style={[styles.retryText, { color: theme.colors.surface }]}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={[styles.grid, { padding: theme.spacing.md }]}>
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSetTile
              key={`skeleton-${index}`}
              cardSet={{
                id: `skeleton-${index}`,
                name: '',
                description: '',
                totalCards: 0,
                categories: [],
              }}
              progress={{
                totalSeen: 0,
                totalCards: 0,
                seenByCategory: defaultSeenByCategory,
              }}
              onPress={() => {}}
              isLoading={true}
            />
          ))}
        </View>
      );
    }

    return <EmptyState />;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {error && (
        <View style={[styles.errorBanner, { backgroundColor: theme.colors.error }]}>
          <Text style={[styles.errorBannerText, { color: theme.colors.surface }]}>{error}</Text>
        </View>
      )}
      <FlatList
        data={cardSets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={[styles.row, { width }]}
        contentContainerStyle={[styles.content, { padding: theme.spacing.md }]}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshCardSets}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        testID="card-set-grid"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  errorBanner: {
    padding: 8,
  },
  errorBannerText: {
    fontSize: 14,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  retryButton: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
