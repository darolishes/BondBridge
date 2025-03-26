import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "@theme/hooks";

interface QuestionTextProps {
  text: string;
}

/**
 * Displays the main question with proper typography styling
 */
const QuestionText: React.FC<QuestionTextProps> = React.memo(({ text }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    text: {
      fontSize: theme.typography.fontSizes.large,
      fontWeight: "600",
      color: theme.colors.text,
      textAlign: "center",
      lineHeight: theme.typography.fontSizes.large * 1.4, // Good line height for readability
    },
  });

  return (
    <Text
      style={styles.text}
      accessible={true}
      accessibilityLabel={text}
      accessibilityRole="text"
    >
      {text}
    </Text>
  );
});

export default QuestionText;
