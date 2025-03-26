import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  createSelector,
  createSelector as createReselectSelector,
} from "reselect";
import { useTheme } from "@theme/hooks";
import { Card } from "../components/Card";
import { useAppDispatch } from "@store/hooks";
import { useCards } from "../hooks/useCards";
import { addCard } from "@store/slices/cardsSlice";
import { Card as CardType } from "../types";
import { useCardSets } from "../hooks/useCardSets";
import { FontAwesome5 } from "@expo/vector-icons";
import { CardScreenNavigationProp } from "@navigation/types";

interface CardScreenProps {
  navigation: CardScreenNavigationProp;
}

/**
 * Hauptbildschirm für die Konversationskarten mit Kartenansicht und Navigation
 */
const CardScreen: React.FC<CardScreenProps> = ({ navigation }) => {
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

  // Use card sets hook to get active card set
  const { activeCardSet } = useCardSets();

  // Navigate to card set screen
  const navigateToCardSets = () => {
    navigation.navigate("CardSet");
  };

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
        {
          id: "4",
          question:
            "Welche gemeinsamen Werte sind dir in einer Beziehung wichtig?",
          category: "intimacy",
          difficulty: 4,
          followUpQuestions: [
            "Wie würdest du unsere gemeinsamen Werte beschreiben?",
            "Welche Werte möchtest du stärker in unserer Beziehung sehen?",
          ],
          created: new Date(),
        },
        {
          id: "5",
          question: "Was ist dein Lieblingserinnerung mit mir?",
          category: "intimacy",
          difficulty: 2,
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

    // If we have more than 10 cards, just show position in numbers instead of dots
    if (cardCount > 10) {
      return (
        <Text style={styles.counterText}>
          {activeCardIndex + 1} / {cardCount}
        </Text>
      );
    }

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
      flexWrap: "wrap", // Allow dots to wrap to next line if too many
      maxWidth: "80%",
    },
    progressDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.textSecondary,
      opacity: 0.3,
      marginHorizontal: 4,
      marginVertical: 2,
    },
    activeDot: {
      backgroundColor: theme.colors.primary,
      opacity: 1,
      width: 10, // Slightly larger
      height: 10,
      borderRadius: 5,
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
    navigationHelp: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.small,
      textAlign: "center",
      marginBottom: theme.spacing.md,
      opacity: 0.7,
    },
    cardSetButton: {
      position: "absolute",
      top: theme.spacing.lg,
      right: theme.spacing.lg,
      backgroundColor: theme.colors.primary,
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
    },
    cardSetInfo: {
      position: "absolute",
      top: theme.spacing.lg + 2,
      left: theme.spacing.lg,
      backgroundColor: theme.colors.card.border,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 4,
      borderRadius: theme.borderRadius.small,
    },
    cardSetText: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSizes.small,
      fontWeight: "500",
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
      {/* Card Set FAB Button */}
      <Pressable style={styles.cardSetButton} onPress={navigateToCardSets}>
        <FontAwesome5 name="layer-group" size={20} color="#fff" />
      </Pressable>

      {/* Show active card set if present */}
      {activeCardSet && (
        <View style={styles.cardSetInfo}>
          <Text style={styles.cardSetText}>{activeCardSet.name}</Text>
        </View>
      )}

      <View style={styles.cardContainer}>
        {activeCard && (
          <Card card={activeCard} isActive={true} onSwipe={handleSwipe} />
        )}
      </View>

      {renderProgressDots()}
      <Text style={styles.navigationHelp}>
        ← Wische nach rechts für die vorherige Karte | Wische nach links für die
        nächste Karte →
      </Text>
    </SafeAreaView>
  );
};

export default CardScreen;
