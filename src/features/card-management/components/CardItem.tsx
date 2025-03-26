import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CardItemProps } from "../types";

/**
 * Card item component that displays a question card
 */
const CardItem: React.FC<CardItemProps> = ({
  question,
  category,
  difficulty,
  followUp,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.difficulty}>{difficulty}</Text>
      <Text style={styles.question}>{question}</Text>
      {followUp && <Text style={styles.followUp}>{followUp}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  difficulty: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  followUp: {
    fontSize: 16,
    marginBottom: 10,
    color: "#888",
  },
});

export default CardItem;
