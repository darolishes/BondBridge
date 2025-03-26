import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@theme/hooks";

interface FollowUpQuestionsProps {
  questions: string[];
}

/**
 * Displays follow-up questions with proper styling
 */
const FollowUpQuestions: React.FC<FollowUpQuestionsProps> = React.memo(
  ({ questions }) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
      container: {
        marginTop: theme.spacing.md,
      },
      title: {
        fontSize: theme.typography.fontSizes.medium,
        fontWeight: "500",
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
      },
      questionContainer: {
        flexDirection: "row",
        marginBottom: theme.spacing.xs,
      },
      bullet: {
        marginRight: theme.spacing.xs,
        color: theme.colors.text,
      },
      questionText: {
        fontSize: theme.typography.fontSizes.medium,
        color: theme.colors.text,
        flex: 1,
      },
    });

    if (!questions || questions.length === 0) {
      return null;
    }

    return (
      <View
        style={styles.container}
        accessible={true}
        accessibilityLabel={`Folgefragen: ${questions.join(", ")}`}
        accessibilityRole="text"
      >
        <Text style={styles.title}>Folgefragen:</Text>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.questionText}>{question}</Text>
          </View>
        ))}
      </View>
    );
  }
);

export default FollowUpQuestions;
