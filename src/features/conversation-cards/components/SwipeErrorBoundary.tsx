import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@theme/hooks";

interface SwipeErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

const SwipeErrorBoundary: React.FC<SwipeErrorBoundaryProps> = ({
  children,
  onReset,
}) => {
  const { theme } = useTheme();
  const [error, setError] = useState<Error | null>(null);

  const handleReset = () => {
    setError(null);
    onReset?.();
  };

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.error }]}>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Swipe operation failed
        </Text>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          {error.message}
        </Text>
        <Pressable
          onPress={handleReset}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? theme.colors.primary + "CC"
                : theme.colors.primary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={{ color: theme.colors.text }}>Reset Card</Text>
        </Pressable>
      </View>
    );
  }

  try {
    return <>{children}</>;
  } catch (err) {
    console.error("Swipe Error:", err);
    setError(err as Error);
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SwipeErrorBoundary;
