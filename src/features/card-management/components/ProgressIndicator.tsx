import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressIndicatorProps } from "../types";

/**
 * Progress indicator component for showing card progress
 */
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fortschritt: {progress}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    margin: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default ProgressIndicator;
