import React from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import { useTheme } from "@theme/hooks";
import { CardProps } from "../types";

/**
 * Einfache Kartenkomponente für Konversationskarten
 *
 * @param props.card - Karteninformationen (Titel, Text, Kategorie)
 * @param props.onSwipe - Callback für Swipe-Aktionen
 */
export const Card: React.FC<CardProps> = ({ card, onSwipe }) => {
  const { theme } = useTheme();
  const pan = React.useRef(new Animated.ValueXY()).current;

  const styles = StyleSheet.create({
    card: {
      width: "90%",
      minHeight: 200,
      backgroundColor: theme.colors.background,
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
    },
    title: {
      fontSize: theme.typography.fontSizes.large,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    content: {
      fontSize: theme.typography.fontSizes.medium,
      color: theme.colors.text,
      lineHeight: 24,
    },
    category: {
      position: "absolute",
      bottom: theme.spacing.sm,
      right: theme.spacing.sm,
      padding: theme.spacing.xs,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.small,
    },
    categoryText: {
      color: theme.colors.background,
      fontSize: theme.typography.fontSizes.small,
    },
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: pan.getTranslateTransform(),
        },
      ]}
    >
      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.content}>{card.content}</Text>
      <View style={styles.category}>
        <Text style={styles.categoryText}>{card.category}</Text>
      </View>
    </Animated.View>
  );
};

export default Card;
