import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@theme/hooks";
import { CardProps } from "../types";
import CategoryBadge from "./CategoryBadge";
import QuestionText from "./QuestionText";
import DifficultyIndicator from "./DifficultyIndicator";
import FollowUpQuestions from "./FollowUpQuestions";
import SwipeHandler from "./SwipeHandler";

/**
 * Konversationskarte Komponente - Zeigt eine Frage, Kategorie und Schwierigkeitsgrad an
 *
 * @param props.card - Karteninformationen (Frage, Kategorie, Schwierigkeit)
 * @param props.isActive - Gibt an, ob die Karte aktiv ist
 * @param props.onSwipe - Callback für Swipe-Aktionen
 */
export const Card: React.FC<CardProps> = React.memo(
  ({ card, isActive = false, onSwipe }) => {
    const { theme } = useTheme();

    const handleSwipeLeft = () => {
      if (onSwipe) {
        onSwipe("left");
      }
    };

    const handleSwipeRight = () => {
      if (onSwipe) {
        onSwipe("right");
      }
    };

    const styles = StyleSheet.create({
      card: {
        width: "90%",
        minHeight: 200,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.medium,
        padding: theme.spacing.md,
        margin: theme.spacing.sm,
        shadowColor: theme.colors.card.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: "relative",
      },
      content: {
        padding: theme.spacing.sm,
        alignItems: "center",
      },
      categoryContainer: {
        position: "absolute",
        top: theme.spacing.sm,
        right: theme.spacing.sm,
      },
      difficultyContainer: {
        position: "absolute",
        bottom: theme.spacing.sm,
        left: theme.spacing.sm,
      },
    });

    const cardContent = (
      <View
        style={styles.card}
        accessible={true}
        accessibilityLabel={`Frage: ${card.question}. Kategorie: ${card.category}. Schwierigkeitsgrad: ${card.difficulty} von 5.`}
        accessibilityRole="button"
      >
        <View style={styles.content}>
          <QuestionText text={card.question} />

          {card.followUpQuestions && card.followUpQuestions.length > 0 && (
            <FollowUpQuestions questions={card.followUpQuestions} />
          )}
        </View>

        <View style={styles.categoryContainer}>
          <CategoryBadge category={card.category} />
        </View>

        <View style={styles.difficultyContainer}>
          <DifficultyIndicator level={card.difficulty} />
        </View>
      </View>
    );

    // Only enable swipe gestures if the card is active
    if (isActive && onSwipe) {
      return (
        <SwipeHandler
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          swipeEnabled={isActive}
        >
          {cardContent}
        </SwipeHandler>
      );
    }

    // Return card without swipe gestures if not active
    return cardContent;
  }
);

export default Card;
