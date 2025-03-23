import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import CardSetTile from '../components/CardSetTile';
import EmptyState from '../components/EmptyState';
import useCardSets from '../hooks/useCardSets';
import { CardSetData } from '../types/cardSet';

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
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={refreshCardSets}
            testID="retry-button"
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.grid}>
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
    <View style={styles.container}>
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
        </View>
      )}
      <FlatList
        data={cardSets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={[styles.row, { width }]}
        contentContainerStyle={styles.content}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshCardSets} />}
        testID="card-set-grid"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1', // background color from design
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  row: {
    justifyContent: 'space-between',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorBanner: {
    backgroundColor: '#FF6B6B',
    padding: 8,
  },
  errorBannerText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;
