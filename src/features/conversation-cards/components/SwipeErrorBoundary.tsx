import React, { ErrorInfo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@theme/hooks";

interface SwipeErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class SwipeErrorBoundary extends React.Component<
  SwipeErrorBoundaryProps,
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Swipe Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    const { theme } = useTheme();

    if (this.state.hasError) {
      return (
        <View
          style={[styles.container, { backgroundColor: theme.colors.error }]}
        >
          <Text style={[styles.text, { color: theme.colors.text }]}>
            Swipe operation failed
          </Text>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            {this.state.error?.message}
          </Text>
          <Pressable
            onPress={this.handleReset}
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

    return this.props.children;
  }
}

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
