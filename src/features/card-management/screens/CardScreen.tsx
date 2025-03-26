import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CardItem from "../components/CardItem";
import CategorySelector from "../components/CategorySelector";
import ProgressIndicator from "../components/ProgressIndicator";
import { CardData } from "../types";

/**
 * Main screen for displaying and interacting with cards
 */
const CardScreen: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Load cards from data file
  useEffect(() => {
    // This would usually load from AsyncStorage or Redux
    // For now, import directly (in real app, use dynamic import or Redux)
    import("../data/cards.json").then((data) => {
      const cardData = data.default.map((card: any, index: number) => ({
        ...card,
        id: `card-${index}`,
      }));
      setCards(cardData);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(cardData.map((card: CardData) => card.category))
      );
      setCategories(uniqueCategories);
    });
  }, []);

  // Filter cards by selected category
  const filteredCards = selectedCategory
    ? cards.filter((card) => card.category === selectedCategory)
    : cards;

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <View style={styles.container}>
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <ProgressIndicator progress={progress} />
      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardItem
            question={item.question}
            category={item.category}
            difficulty={item.difficulty}
            followUp={item.followUp}
          />
        )}
        contentContainerStyle={styles.cardsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  cardsContainer: {
    padding: 16,
  },
});

export default CardScreen;
