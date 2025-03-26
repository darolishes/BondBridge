import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { useTheme } from "@theme/hooks";
import Card from "../components/Card";
import { Card as CardType } from "../types";

/**
 * Hauptbildschirm für die Konversationskarten mit Kartenansicht und Navigation
 */
const CardScreen: React.FC = () => {
  const { theme } = useTheme();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Sample cards for development/testing
  const sampleCards: CardType[] = [
    {
      id: "1",
      question: "Was war dein schönstes Erlebnis in der letzten Woche?",
      category: "icebreakers",
      difficulty: 1,
      created: new Date(),
    },
    {
      id: "2",
      question: "Wenn du eine Sache an dir ändern könntest, was wäre das?",
      category: "personality",
      difficulty: 3,
      followUpQuestions: [
        "Warum möchtest du das ändern?",
        "Wie würde diese Änderung dein Leben beeinflussen?",
      ],
      created: new Date(),
    },
    {
      id: "3",
      question: "Was ist deine tiefste Angst in unserer Beziehung?",
      category: "deepThoughts",
      difficulty: 5,
      followUpQuestions: [
        "Wann hast du diese Angst zum ersten Mal gespürt?",
        "Was können wir gemeinsam tun, um diese Angst zu bewältigen?",
      ],
      created: new Date(),
    },
  ];

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && currentCardIndex < sampleCards.length - 1) {
      // Nächste Karte
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (direction === "right" && currentCardIndex > 0) {
      // Vorherige Karte
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  // Progress indicator (dots)
  const renderProgressDots = () => {
    return (
      <View style={styles.progressContainer}>
        {sampleCards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentCardIndex ? styles.activeDot : {},
            ]}
          />
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    cardContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    progressContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: theme.spacing.md,
    },
    progressDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.textSecondary,
      opacity: 0.3,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: theme.colors.primary,
      opacity: 1,
    },
    counterText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.small,
      marginTop: theme.spacing.sm,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card
          card={sampleCards[currentCardIndex]}
          isActive={true}
          onSwipe={handleSwipe}
        />
      </View>

      {renderProgressDots()}
      <Text style={styles.counterText}>
        {currentCardIndex + 1} / {sampleCards.length}
      </Text>
    </SafeAreaView>
  );
};

export default CardScreen;
