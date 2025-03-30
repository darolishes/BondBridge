import { ViewStyle } from "react-native";
import { spacing } from "./spacing";
import { colors } from "./colors";

export const uiComponents = {
  dropZone: {
    activeBorder: colors.primary,
    activeBorderWidth: 2,
    hoverBorder: colors.secondary,
    invalidBorder: colors.error,
    height: 150,
    borderRadius: 8,
    backgroundColor: colors.surface,
    padding: spacing.medium,
  },
  fileItem: {
    height: 60,
    marginVertical: spacing.small,
    borderRadius: 6,
    padding: spacing.small,
    statusColors: {
      loading: colors.primary,
      success: colors.success,
      error: colors.error,
      pending: colors.warning,
    },
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surface,
    fillColor: colors.primary,
  },
  setCard: {
    width: "100%",
    height: 120,
    backgroundColor: colors.surface,
    borderRadius: 8,
    shadowColor: colors.card.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: spacing.medium,
  } as ViewStyle & {
    width: string | number;
    height: number;
  },
  grid: {
    spacing: spacing.medium,
    columns: 2,
  },
};
