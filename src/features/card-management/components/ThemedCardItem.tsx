import React from "react";
import { View, Text, StyleSheet, TextStyle, ColorValue } from "react-native";
import { CardItemProps } from "@features/card-management/types";
import { Theme } from "@theme/themes";
import { createThemedStyles, useTheme } from "@theme/useTheme";

/**
 * A themed card item component that uses the app's theme system
 */
const ThemedCardItem: React.FC<CardItemProps> = ({
  question,
  category,
  difficulty,
  followUp,
}) => {
  // Verwende das Theme für Styling
  const styles = useStyles();
  const { theme } = useTheme();

  // Bestimme Farbe basierend auf Schwierigkeit
  const getDifficultyColor = (difficulty: string): ColorValue => {
    switch (difficulty) {
      case "easy":
        return theme.colors.success;
      case "medium":
        return theme.colors.warning;
      case "hard":
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <Text
        style={[styles.difficulty, { color: getDifficultyColor(difficulty) }]}
      >
        {difficulty}
      </Text>
      <Text style={styles.question}>{question}</Text>
      {followUp && <Text style={styles.followUp}>{followUp}</Text>}
    </View>
  );
};

// Stilcreator-Funktion mit Theme-Parameter
const createStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    margin: theme.spacing.md,
    shadowColor: theme.colors.card.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
  category: {
    fontSize: theme.typography.fontSizes.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontWeight: "500" as const,
  },
  difficulty: {
    fontSize: theme.typography.fontSizes.small,
    marginBottom: theme.spacing.sm,
    fontWeight: "500" as const,
  },
  question: {
    fontSize: theme.typography.fontSizes.large,
    fontWeight: "700" as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  followUp: {
    fontSize: theme.typography.fontSizes.medium,
    marginTop: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
});

// Erstelle einen Hook, der die Styles mit dem aktuellen Theme erzeugt
const useStyles = createThemedStyles(createStyles);

export default ThemedCardItem;
