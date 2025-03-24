import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

interface ProgressBarProps {
  /** Progress percentage (0-100) */
  progress: number;
  /** Height of the progress bar in pixels */
  height?: number;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom fill color */
  fillColor?: string;
  /** Custom border radius */
  borderRadius?: number;
}

/**
 * A reusable progress bar component
 */
export function ProgressBar({
  progress,
  height = 8,
  backgroundColor,
  fillColor,
  borderRadius = 4,
}: ProgressBarProps) {
  const { isDarkMode } = useTheme();

  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height,
      backgroundColor: backgroundColor || (isDarkMode ? '#2C2C2C' : '#E0E0E0'),
      borderRadius,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      width: `${clampedProgress}%`,
      backgroundColor: fillColor || (isDarkMode ? '#BB86FC' : '#6200EE'),
      borderRadius,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.fill} />
    </View>
  );
}
