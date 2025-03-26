import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ThemedCardItem from "@features/card-management/components/ThemedCardItem";
import { useTheme } from "@theme/ThemeProvider";
import { createThemedStyles } from "@theme/useTheme";
import { Theme } from "@theme/themes";
import { CardItemProps } from "@features/card-management/types";
import type { ScreenProps } from "@navigation/types";

/**
 * CardListScreen
 * --------------
 * Hauptbildschirm zur Anzeige von Kartenlisten mit Filtermöglichkeiten.
 * Zeigt Karten in einem scrollbaren Container an.
 *
 * @component
 * @screen
 * @feature card-management
 */
const CardListScreen: React.FC<ScreenProps["CardList"]> = () => {
  const { theme } = useTheme();
  const styles = useStyles();

  // Beispiel-Karten
  const sampleCards: CardItemProps[] = [
    {
      question: "Wie heißt die Hauptstadt von Deutschland?",
      category: "Geographie",
      difficulty: "easy",
      followUp: "Nenne drei weitere große Städte in Deutschland.",
    },
    {
      question: "Was ist das chemische Symbol für Gold?",
      category: "Chemie",
      difficulty: "medium",
      followUp: undefined,
    },
    {
      question:
        "Welche Kraft hält die Planeten in der Umlaufbahn um die Sonne?",
      category: "Physik",
      difficulty: "hard",
      followUp: "Erkläre das Gravitationsgesetz von Newton.",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meine Kartensammlung</Text>
      <ScrollView style={styles.scrollContainer}>
        {sampleCards.map((card, index) => (
          <ThemedCardItem
            key={index}
            question={card.question}
            category={card.category}
            difficulty={card.difficulty}
            followUp={card.followUp}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizes.xlarge,
    fontWeight: "700" as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: "center" as const,
  },
  scrollContainer: {
    flex: 1,
  },
});

const useStyles = createThemedStyles(createStyles);

export default CardListScreen;
