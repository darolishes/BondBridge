import type { ThemeColors } from "../types";

export const colors: ThemeColors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  background: "#FFFFFF",
  surface: "#F2F2F7",
  text: "#000000",
  textSecondary: "#8E8E93",
  textOnPrimary: "#FFFFFF",
  error: "#FF3B30",
  warning: "#FF9500",
  success: "#34C759",
  card: {
    shadow: "rgba(0, 0, 0, 0.1)",
    background: "#FFFFFF",
    backgroundActive: "#F2F2F7",
    backgroundError: "#FFEBED",
    borderActive: "#007AFF",
    borderError: "#FF3B30",
  },
  button: {
    primary: {
      background: "#007AFF",
      text: "#FFFFFF",
    },
    secondary: {
      background: "#F2F2F7",
      text: "#007AFF",
    },
    destructive: {
      background: "#FF3B30",
      text: "#FFFFFF",
    },
  },
};
