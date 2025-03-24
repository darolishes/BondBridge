import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { ProgressBar } from './ProgressBar';
import type { ProgressSummary as ProgressSummaryType } from '@types';

interface ProgressSummaryProps {
  /** Progress data */
  progress: ProgressSummaryType;
  /** Total number of cards in the set */
  totalCards: number;
  /** Whether to show detailed stats */
  showDetails?: boolean;
}

/**
 * A component that displays progress summary with optional details
 */
export function ProgressSummary({
  progress,
  totalCards,
  showDetails = true,
}: ProgressSummaryProps) {
  const { isDarkMode } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    percentage: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    progressBar: {
      marginVertical: 8,
    },
    details: {
      marginTop: 12,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    detailLabel: {
      color: isDarkMode ? '#BBBBBB' : '#666666',
    },
    detailValue: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
      fontWeight: '500',
    },
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.percentage}>{progress.percentage}%</Text>
      </View>

      <View style={styles.progressBar}>
        <ProgressBar progress={progress.percentage} />
      </View>

      {showDetails && (
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cards Seen</Text>
            <Text style={styles.detailValue}>
              {progress.seenCards.length} / {totalCards}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Viewed</Text>
            <Text style={styles.detailValue}>{formatDate(progress.lastViewedAt)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Completed</Text>
            <Text style={styles.detailValue}>{formatDate(progress.completedAt)}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
