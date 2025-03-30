import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import type { SwipeMetrics } from "@cards/hooks/useSwipePerformance";
import { useTheme } from "@theme/hooks";
import type { Theme } from "@theme/types";

interface PerformanceOverlayProps {
  metrics: SwipeMetrics;
  targetFps?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showDetails?: boolean;
}

export const PerformanceOverlay: React.FC<PerformanceOverlayProps> = ({
  metrics,
  targetFps = 60,
  position = "top-right",
  showDetails = false,
}) => {
  const { colors, spacing } = useTheme();
  const styles = createStyles({ colors, spacing });
  const fpsColor = useRef(new Animated.Value(0)).current;

  const containerPosition = {
    "top-left": styles.topLeft,
    "top-right": styles.topRight,
    "bottom-left": styles.bottomLeft,
    "bottom-right": styles.bottomRight,
  }[position];

  // FPS-Farbe animieren
  useEffect(() => {
    const normalizedFps = Math.min(metrics.fps / targetFps, 1);
    Animated.spring(fpsColor, {
      toValue: normalizedFps,
      useNativeDriver: false,
    }).start();
  }, [metrics.fps, targetFps, fpsColor]);

  const getIndicatorColor = useCallback(
    (value: number, threshold: number) => {
      if (value >= threshold * 0.9) return colors.success;
      if (value >= threshold * 0.6) return colors.warning;
      return colors.error;
    },
    [colors]
  );

  const fpsIndicatorColor = fpsColor.interpolate({
    inputRange: [0, 0.6, 0.9, 1],
    outputRange: [colors.error, colors.warning, colors.success, colors.success],
  });

  const renderDetailedMetrics = () => {
    if (!showDetails) return null;

    return (
      <>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Frame Zeit:</Text>
          <Text
            style={[
              styles.metricValue,
              { color: getIndicatorColor(16.67 / metrics.frameTime, 1) },
            ]}
          >
            {metrics.frameTime.toFixed(1)}ms
          </Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Gedropte Frames:</Text>
          <Text
            style={[
              styles.metricValue,
              {
                color: getIndicatorColor(
                  1 - metrics.droppedFrames / metrics.totalFrames,
                  0.95
                ),
              },
            ]}
          >
            {metrics.droppedFrames}
          </Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Drag Distanz:</Text>
          <Text style={styles.metricValue}>{metrics.dragDistance}px</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Frames Total:</Text>
          <Text style={styles.metricValue}>{metrics.totalFrames}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={[styles.container, containerPosition]}>
      <View style={styles.fpsContainer}>
        <Animated.Text style={[styles.fpsValue, { color: fpsIndicatorColor }]}>
          {metrics.fps}
        </Animated.Text>
        <Text style={styles.fpsLabel}>FPS</Text>
      </View>
      {renderDetailedMetrics()}
    </View>
  );
};

const createStyles = ({
  colors,
  spacing,
}: {
  colors: Theme["colors"];
  spacing: Theme["spacing"];
}) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      padding: spacing.small,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderRadius: 8,
      minWidth: 100,
    },
    topLeft: {
      top: spacing.medium,
      left: spacing.medium,
    },
    topRight: {
      top: spacing.medium,
      right: spacing.medium,
    },
    bottomLeft: {
      bottom: spacing.medium,
      left: spacing.medium,
    },
    bottomRight: {
      bottom: spacing.medium,
      right: spacing.medium,
    },
    fpsContainer: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "center",
      marginBottom: spacing.tiny,
    },
    fpsValue: {
      fontSize: 24,
      fontWeight: "bold",
      marginRight: spacing.tiny,
    },
    fpsLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    metricRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: spacing.tiny,
    },
    metricLabel: {
      color: colors.textSecondary,
      fontSize: 12,
    },
    metricValue: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "500",
    },
  });
