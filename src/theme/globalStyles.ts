/**
 * Global style utility for quick access to commonly used styles
 */

import { StyleSheet } from "react-native";
import { palette } from "./constants/colors";
import { spacing } from "./constants/spacing";
import { fontSizes } from "./constants/typography";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.neutral.white,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
  text: {
    fontSize: fontSizes.medium,
    color: palette.neutral.black,
  },
  card: {
    backgroundColor: palette.neutral.white,
    borderRadius: 8,
    padding: spacing.md,
    margin: spacing.sm,
    shadowColor: palette.neutral.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default globalStyles;
