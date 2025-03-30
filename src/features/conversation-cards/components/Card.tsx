import React, { useCallback } from "react";
import { StyleSheet, View, Platform, Pressable } from "react-native";
import { useTheme } from "@theme/hooks";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { CardProps } from "@cards/types";
import CategoryBadge from "@cards/components/CategoryBadge";
import QuestionText from "@cards/components/QuestionText";
import DifficultyIndicator from "@cards/components/DifficultyIndicator";
import FollowUpQuestions from "@cards/components/FollowUpQuestions";
import { SwipeHandler } from "@cards/components/SwipeHandler";

/**
 * Konversationskarte Komponente - Zeigt eine Frage, Kategorie und Schwierigkeitsgrad an
 *
 * @param props.card - Karteninformationen (Frage, Kategorie, Schwierigkeit)
 * @param props.isActive - Gibt an, ob die Karte aktiv ist
 * @param props.onSwipe - Callback für Swipe-Aktionen
 */
const Card: React.FC<CardProps> = React.memo(
  ({ card, isActive = false, onSwipe }) => {
    const { theme } = useTheme();
    const scale = useSharedValue(1);
    const elevation = useSharedValue(2);

    const handlePressIn = useCallback(() => {
      scale.value = withSpring(0.98, {
        damping: 15,
        stiffness: 150,
      });
      elevation.value = withSpring(4);
    }, []);

    const handlePressOut = useCallback(() => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
      elevation.value = withSpring(2);
    }, []);

    const handleSwipeLeft = useCallback(() => {
      if (onSwipe) {
        onSwipe("left");
      }
    }, [onSwipe]);

    const handleSwipeRight = useCallback(() => {
      if (onSwipe) {
        onSwipe("right");
      }
    }, [onSwipe]);

    // Material Design 3 elevation system
    const getElevation = (level: number) => {
      if (Platform.OS === "web") {
        return {
          boxShadow: `0px ${level}px ${level * 2}px rgba(0,0,0,0.14),
                      0px ${level / 2}px ${level}px rgba(0,0,0,0.12),
                      0px ${level / 2}px ${level / 2}px rgba(0,0,0,0.2)`,
        };
      }
      return {
        elevation: level,
        shadowColor: theme.colors.card.shadow,
        shadowOffset: { width: 0, height: level },
        shadowOpacity: 0.25,
        shadowRadius: level * 2,
      };
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
        ...getElevation(elevation.value),
      };
    });

    const styles = StyleSheet.create({
      cardWrapper: {
        width: "90%",
        maxWidth: 600,
        margin: theme.spacing.md,
      },
      card: {
        width: "100%",
        minHeight: 220,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.medium,
        borderWidth: 1,
        borderColor: theme.colors.card.border,
        position: "relative",
        overflow: "hidden",
      },
      innerContainer: {
        padding: theme.spacing.lg,
      },
      content: {
        padding: theme.spacing.md,
        alignItems: "center",
        gap: theme.spacing.md,
      },
      categoryContainer: {
        position: "absolute",
        top: theme.spacing.md,
        right: theme.spacing.md,
        zIndex: 1,
      },
      difficultyContainer: {
        position: "absolute",
        bottom: theme.spacing.md,
        left: theme.spacing.md,
        zIndex: 1,
      },
      pressable: {
        width: "100%",
        height: "100%",
      },
    });

    const CardContent = () => (
      <View style={styles.cardWrapper}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Pressable
            style={styles.pressable}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            android_ripple={{
              color: theme.colors.primary + "1A", // 10% opacity
              borderless: false,
            }}
            accessible={true}
            accessibilityLabel={`Frage: ${card.question}. Kategorie: ${card.category}. Schwierigkeitsgrad: ${card.difficulty} von 5.`}
            accessibilityRole="button"
          >
            <View style={[styles.innerContainer, styles.content]}>
              <QuestionText text={card.question} />

              {card.followUpQuestions && card.followUpQuestions.length > 0 && (
                <FollowUpQuestions questions={card.followUpQuestions} />
              )}

              <View style={styles.categoryContainer}>
                <CategoryBadge category={card.category} />
              </View>

              <View style={styles.difficultyContainer}>
                <DifficultyIndicator level={card.difficulty} />
              </View>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    );

    // Conditionally render SwipeHandler based on platform
    // Conditionally render SwipeHandler based on platform
    if (isActive && onSwipe) {
      return (
        <SwipeHandler
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          swipeEnabled={isActive}
        >
          <CardContent />
        </SwipeHandler>
      );
    } else {
      return <CardContent />;
    }
  }
);

export { Card };
