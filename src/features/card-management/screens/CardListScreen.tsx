import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ThemedCardItem from "@features/card-management/components/ThemedCardItem";
import { useTheme } from "@theme/useTheme";
import { Theme } from "@theme/themes";

/**
 * Zeigt eine Liste von Karten im gewählten Theme an
 */
const CardListScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Beispiel-Karten
  const sampleCards = [
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
      followUp: null,
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.fontSizes.xlarge,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
      textAlign: "center",
    },
    scrollContainer: {
      flex: 1,
    },
  });

export default CardListScreen;
