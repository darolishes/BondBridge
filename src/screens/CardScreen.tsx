import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { cards } from "../data/cards.json";
import Card from "../components/Card";

export default function CardScreen() {
  const [cardsData, setCardsData] = useState(cards);

  return (
    <View style={styles.container}>
      <FlatList
        data={cardsData}
        keyExtractor={(item) => item.question}
        renderItem={({ item }) => (
          <Card
            question={item.question}
            category={item.category}
            difficulty={item.difficulty}
          />
        )}
        contentContainerStyle={styles.cardsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  cardsContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
