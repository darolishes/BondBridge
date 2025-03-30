import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import { useCardSetUpload } from "@cards/hooks/useCardSetUpload";
import { useTheme } from "@theme/hooks";
import type { Theme } from "@theme/types";

export const CardSetManager: React.FC = () => {
  const { uploadCardSet, progress, error, isUploading, reset } =
    useCardSetUpload();
  const { colors, spacing } = useTheme();

  const styles = createStyles({ colors, spacing });

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        await uploadCardSet(file);
      } catch (error) {
        console.error("Upload fehlgeschlagen:", error);
      }
    },
    [uploadCardSet]
  );

  const renderUploadButton = () => {
    if (isUploading) {
      return (
        <View style={styles.uploadButton}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.uploadText}>
            Upload läuft (
            {progress?.current && progress.total
              ? Math.round((progress.current / progress.total) * 100)
              : 0}
            %)
          </Text>
        </View>
      );
    }

    if (Platform.OS === "web") {
      return (
        <>
          <input
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{ display: "none" }}
            id="card-set-upload"
          />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => document.getElementById("card-set-upload")?.click()}
          >
            <Text style={styles.uploadText}>Kartenset hochladen</Text>
          </TouchableOpacity>
        </>
      );
    }

    return (
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadText}>Kartenset hochladen</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kartenset-Verwaltung</Text>

      {renderUploadButton()}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={reset}>
            <Text style={styles.resetText}>Erneut versuchen</Text>
          </TouchableOpacity>
        </View>
      )}

      {progress?.status === "complete" && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            Kartenset erfolgreich hochgeladen!
          </Text>
          <TouchableOpacity onPress={reset}>
            <Text style={styles.resetText}>Weiteres Set hochladen</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const createStyles = ({
  colors,
  spacing,
}: {
  colors: Theme["colors"];
  spacing: Theme["spacing"];
}) =>
  StyleSheet.create({
    container: {
      padding: spacing.medium,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: spacing.medium,
      color: colors.text,
    },
    uploadButton: {
      backgroundColor: colors.primary,
      padding: spacing.medium,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    uploadText: {
      color: colors.background,
      fontSize: 16,
      fontWeight: "500",
      marginLeft: spacing.small,
    },
    errorContainer: {
      marginTop: spacing.medium,
      padding: spacing.medium,
      backgroundColor: colors.error,
      borderRadius: 8,
    },
    errorText: {
      color: colors.background,
      fontSize: 14,
    },
    successContainer: {
      marginTop: spacing.medium,
      padding: spacing.medium,
      backgroundColor: colors.success,
      borderRadius: 8,
    },
    successText: {
      color: colors.background,
      fontSize: 14,
    },
    resetText: {
      color: colors.background,
      fontSize: 14,
      textDecorationLine: "underline",
      marginTop: spacing.small,
    },
  });

export default CardSetManager;
