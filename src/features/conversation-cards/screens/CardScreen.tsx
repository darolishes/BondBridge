import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@theme/hooks";
import Card from "../components/Card";
import { useAppDispatch } from "@store/hooks";
import { useCards } from "../hooks/useCards";
import { addCard } from "@store/slices/cardsSlice";
import { Card as CardType } from "../types";

/**
 * Hauptbildschirm für die Konversationskarten mit Kartenansicht und Navigation
 */
const CardScreen: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  // Use our custom hooks for accessing card state
  const {
    activeCard,
    filteredCards,
    activeCardIndex,
    cardCount,
    goToNextCard,
    goToPreviousCard,
    canGoNext,
    canGoPrevious,
  } = useCards();

  // Load sample cards on first render
  useEffect(() => {
    // Only add sample cards if there are none
    if (filteredCards.length === 0) {
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

      // Add cards to store
      sampleCards.forEach((card) => dispatch(addCard(card)));
    }
  }, [dispatch, filteredCards.length]);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && canGoNext) {
      // Nächste Karte
      goToNextCard();
    } else if (direction === "right" && canGoPrevious) {
      // Vorherige Karte
      goToPreviousCard();
    }
  };

  // Progress indicator (dots)
  const renderProgressDots = () => {
    // Only show dots if we have cards
    if (cardCount === 0) return null;

    return (
      <View style={styles.progressContainer}>
        {Array.from({ length: cardCount }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === activeCardIndex ? styles.activeDot : {},
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
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyStateText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.medium,
      textAlign: "center",
      margin: theme.spacing.lg,
    },
  });

  // Loading state
  if (cardCount === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.emptyStateText}>Laden...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        {activeCard && (
          <Card card={activeCard} isActive={true} onSwipe={handleSwipe} />
        )}
      </View>

      {renderProgressDots()}
      <Text style={styles.counterText}>
        {activeCardIndex + 1} / {cardCount}
      </Text>
    </SafeAreaView>
  );
};

export default CardScreen;
