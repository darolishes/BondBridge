import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@theme/hooks";
import { CardCategory } from "../types";

interface CategoryBadgeProps {
  category: CardCategory;
}

/**
 * Displays a badge with the card's category
 */
const CategoryBadge: React.FC<CategoryBadgeProps> = React.memo(
  ({ category }) => {
    const { theme } = useTheme();

    // Get category color from theme
    const categoryColor = useMemo(() => {
      const categoryColors = {
        icebreakers: "#5BC0EB",
        confessions: "#F44336",
        personality: "#9C27B0",
        deepThoughts: "#3F51B5",
        intimacy: "#FF9800",
        growth: "#4CAF50",
      };
      return categoryColors[category] || theme.colors.primary;
    }, [category, theme.colors.primary]);

    const styles = StyleSheet.create({
      badge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        backgroundColor: categoryColor,
        borderRadius: theme.borderRadius.small,
        alignSelf: "flex-start",
      },
      text: {
        color: "#FFFFFF",
        fontSize: theme.typography.fontSizes.small,
        fontWeight: "500",
      },
    });

    return (
      <View
        style={styles.badge}
        accessible={true}
        accessibilityLabel={`Kategorie: ${category}`}
        accessibilityRole="text"
      >
        <Text style={styles.text}>{category}</Text>
      </View>
    );
  }
);

export default CategoryBadge;
