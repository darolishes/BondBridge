import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { CardSetManager } from "../components";
import { useTheme } from "@theme/hooks";

/**
 * Card Set Screen
 * ---------------
 * Screen for managing external card sets
 */
const CardSetScreen: React.FC = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <CardSetManager />
    </SafeAreaView>
  );
};

export default CardSetScreen;
