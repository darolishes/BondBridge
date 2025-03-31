import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { useCardStore } from '@/stores/cardStore';
import { Ionicons } from '@expo/vector-icons';

const CATEGORY_COLORS = {
  memories: '#FFE0E0',
  emotions: '#E0F4FF',
  dreams: '#E8E0FF',
  values: '#E0FFE3',
  challenges: '#FFE8E0',
  growth: '#F4E0FF',
};

export default function ProgressScreen() {
  const { cards, currentCardIndex } = useCardStore();

  const categoryCounts = cards.reduce((acc, card) => {
    acc[card.category] = (acc[card.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const completedCategories = cards
    .slice(0, currentCardIndex)
    .reduce((acc, card) => {
      acc[card.category] = (acc[card.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const categories = Object.keys(categoryCounts);
  const totalCards = cards.length;
  const completedCards = currentCardIndex;
  const progressPercentage =
    Math.round((completedCards / totalCards) * 100) || 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Ionicons name="bar-chart-outline" size={24} color="#4A90E2" />
      </View>

      <View style={styles.overallProgress}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
          <Text style={styles.progressLabel}>Complete</Text>
        </View>
        <Text style={styles.progressText}>
          {completedCards} of {totalCards} cards explored
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Category Breakdown</Text>
      {categories.map((category) => (
        <View key={category} style={styles.categoryItem}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryName}>{category}</Text>
            <Text style={styles.categoryCount}>
              {completedCategories[category] || 0}/{categoryCounts[category]}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor:
                    CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
                  width: `${
                    ((completedCategories[category] || 0) /
                      categoryCounts[category]) *
                    100
                  }%`,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 40,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: '#333333',
  },
  overallProgress: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressPercentage: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    color: 'white',
  },
  progressLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  progressText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#666666',
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#333333',
    marginBottom: 16,
  },
  categoryItem: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#333333',
    textTransform: 'capitalize',
  },
  categoryCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
