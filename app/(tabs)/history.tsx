import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useCardStore } from '@/stores/cardStore';
import { format } from 'date-fns';
import { Share2, Clock, Filter } from 'lucide-react-native';
import { useState, useMemo } from 'react';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

type SortOption = 'newest' | 'oldest';
type FilterOption = 'all' | 'memories' | 'emotions' | 'dreams' | 'values' | 'challenges' | 'growth';

export default function HistoryScreen() {
  const { journeyCompletions, shareJourney } = useCardStore();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const sortedAndFilteredJourneys = useMemo(() => {
    let filtered = journeyCompletions;
    
    if (filterBy !== 'all') {
      filtered = filtered.filter(journey => 
        journey.cards.some(card => card.card.category === filterBy)
      );
    }

    return [...filtered].sort((a, b) => 
      sortBy === 'newest' ? b.endTime - a.endTime : a.endTime - b.endTime
    );
  }, [journeyCompletions, sortBy, filterBy]);

  const renderJourneyItem = ({ item: journey }) => (
    <View style={styles.journeyCard}>
      <LinearGradient
        colors={['#4A90E2', '#6AB3FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.dateHeader}>
        <Clock size={20} color="white" />
        <Text style={styles.dateText}>
          {format(journey.startTime, 'PPP')}
        </Text>
      </LinearGradient>

      <View style={styles.journeyContent}>
        <Text style={styles.statsText}>
          {journey.cards.length} cards explored • {format(journey.endTime - journey.startTime, 'mm')} minutes
        </Text>

        <View style={styles.categories}>
          {Array.from(new Set(journey.cards.map(c => c.card.category))).map(category => (
            <View key={category} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => shareJourney(journey.id)}>
          <Share2 size={20} color="#4A90E2" />
          <Text style={styles.shareText}>Share Journey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Journey History</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            // Toggle sort order
            setSortBy(current => current === 'newest' ? 'oldest' : 'newest');
          }}>
          <Filter size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {(['all', 'memories', 'emotions', 'dreams', 'values', 'challenges', 'growth'] as FilterOption[]).map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.filterOption,
                filterBy === option && styles.filterOptionActive,
              ]}
              onPress={() => setFilterBy(option)}>
              <Text
                style={[
                  styles.filterText,
                  filterBy === option && styles.filterTextActive,
                ]}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={sortedAndFilteredJourneys}
        renderItem={renderJourneyItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: '#333333',
  },
  filterButton: {
    padding: 8,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterOptionActive: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666666',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  list: {
    padding: 20,
  },
  journeyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  dateText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
    marginLeft: 8,
  },
  journeyContent: {
    padding: 16,
  },
  statsText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#666666',
    textTransform: 'capitalize',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  shareText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 8,
  },
});