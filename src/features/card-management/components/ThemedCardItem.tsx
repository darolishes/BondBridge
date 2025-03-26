import React from "react";
import { View, Text, StyleSheet, TextStyle, ColorValue } from "react-native";
import { CardItemProps } from "@features/card-management/types";
import { Theme } from "@theme/themes";
import { createUseStyles } from "@theme/useTheme";

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

  // Bestimme Farbe basierend auf Schwierigkeit
  const getDifficultyColor = (difficulty: string): ColorValue => {
    switch (difficulty) {
      case "easy":
        return styles.difficultyEasy.color || "";
      case "medium":
        return styles.difficultyMedium.color || "";
      case "hard":
        return styles.difficultyHard.color || "";
      default:
        return styles.difficulty.color || "";
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
const createStyles = (theme: Theme) =>
  StyleSheet.create({
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
      fontWeight: "500",
    } as TextStyle,
    difficulty: {
      fontSize: theme.typography.fontSizes.small,
      marginBottom: theme.spacing.sm,
      fontWeight: "500",
    } as TextStyle,
    difficultyEasy: {
      color: theme.colors.success,
    } as TextStyle,
    difficultyMedium: {
      color: theme.colors.warning,
    } as TextStyle,
    difficultyHard: {
      color: theme.colors.error,
    } as TextStyle,
    question: {
      fontSize: theme.typography.fontSizes.large,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    } as TextStyle,
    followUp: {
      fontSize: theme.typography.fontSizes.medium,
      marginTop: theme.spacing.sm,
      color: theme.colors.textSecondary,
    } as TextStyle,
  });

// Erstelle einen Hook, der die Styles mit dem aktuellen Theme erzeugt
const useStyles = createUseStyles(createStyles);

export default ThemedCardItem;
