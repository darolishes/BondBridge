import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@theme/hooks";

interface DifficultyIndicatorProps {
  level: number; // 1-5
}

/**
 * Displays difficulty level as 1-5 stars
 */
const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = React.memo(
  ({ level }) => {
    const { theme } = useTheme();

    // Ensure level is between 1-5
    const normalizedLevel = Math.max(1, Math.min(5, level));

    const styles = StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center",
      },
      star: {
        fontSize: theme.typography.fontSizes.medium,
        marginRight: 2,
        color: theme.colors.accent,
      },
      starEmpty: {
        fontSize: theme.typography.fontSizes.medium,
        marginRight: 2,
        color: theme.colors.textSecondary,
        opacity: 0.3,
      },
    });

    // Render stars
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <Text
            key={i}
            style={i <= normalizedLevel ? styles.star : styles.starEmpty}
          >
            ★
          </Text>
        );
      }
      return stars;
    };

    return (
      <View
        style={styles.container}
        accessible={true}
        accessibilityLabel={`Schwierigkeitsgrad: ${normalizedLevel} von 5`}
        accessibilityRole="text"
      >
        {renderStars()}
      </View>
    );
  }
);

export default DifficultyIndicator;
