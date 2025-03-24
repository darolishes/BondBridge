import { StyleSheet } from 'react-native';
import { Theme } from '@types';

const PROGRESS_BAR_HEIGHT = 8;
const FONT_SIZE = 12;
const BORDER_RADIUS = 4;
const RETRY_FONT_WEIGHT = '600';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: PROGRESS_BAR_HEIGHT,
      backgroundColor: theme.colors.progressBackground,
      borderRadius: BORDER_RADIUS,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: BORDER_RADIUS,
    },
    errorContainer: {
      marginTop: theme.spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
    },
    errorText: {
      color: theme.colors.error,
      fontSize: FONT_SIZE,
      marginRight: theme.spacing.xs,
    },
    retryButton: {
      padding: theme.spacing.xs,
    },
    retryText: {
      color: theme.colors.primary,
      fontSize: FONT_SIZE,
      fontWeight: RETRY_FONT_WEIGHT,
    },
  });

export const createStyles = (theme: Theme, percentage: number) =>
  StyleSheet.create({
    progress: {
      width: `${percentage}%`,
    },
  });
