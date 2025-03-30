import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useTheme } from "@theme/hooks";
import { useCardSetUpload } from "@cards/hooks/useCardSetUpload";
import { WebDropZone } from "@cards/components/platform/WebDropZone";
import type { Theme } from "@theme/types";

interface CardSetUploaderProps {
  onUploadComplete?: () => void;
}

export const CardSetUploader: React.FC<CardSetUploaderProps> = ({
  onUploadComplete,
}) => {
  const { colors, spacing } = useTheme();
  const styles = createStyles({ colors, spacing });

  const [isDragging, setIsDragging] = useState(false);
  const { uploadCardSet, progress, error, isUploading, reset } =
    useCardSetUpload();

  const handleFileDrop = useCallback(
    async (file: File) => {
      try {
        await uploadCardSet(file);
        onUploadComplete?.();
      } catch (err) {
        // Error wird bereits vom Hook behandelt
        console.error("Upload fehlgeschlagen:", err);
      }
    },
    [uploadCardSet, onUploadComplete]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        await uploadCardSet(file);
        onUploadComplete?.();
      } catch (err) {
        console.error("Upload fehlgeschlagen:", err);
      }
    },
    [uploadCardSet, onUploadComplete]
  );

  const dropZoneContent = (
    <>
      <Text style={styles.dropZoneText}>
        {error ? (
          <>
            <Text style={styles.errorText}>{error}</Text>
            {"\n"}
            <Text style={styles.retryText}>Klicke zum erneuten Versuchen</Text>
          </>
        ) : (
          "Ziehe eine JSON-Datei hierher oder klicke zum Auswählen"
        )}
      </Text>
      <input
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        style={{ display: "none" }}
        id="file-upload"
      />
    </>
  );

  const renderUploadZone = () => {
    if (isUploading) {
      return (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.uploadingText}>
            {progress?.status === "parsing" && "Datei wird gelesen..."}
            {progress?.status === "validating" && "Validiere Kartenset..."}
            {progress?.status === "importing" && "Importiere Karten..."}
            {progress?.current &&
              progress.total &&
              `\n${Math.round((progress.current / progress.total) * 100)}%`}
          </Text>
        </View>
      );
    }

    // Web-spezifisches Drag & Drop
    if (Platform.OS === "web") {
      const dropZoneStyle = {
        ...styles.dropZone,
        ...(isDragging ? styles.dropZoneActive : {}),
        ...(error ? styles.dropZoneError : {}),
      };

      return (
        <WebDropZone
          onDrop={handleFileDrop}
          onDragStateChange={setIsDragging}
          style={dropZoneStyle}
        >
          {dropZoneContent}
        </WebDropZone>
      );
    }

    // Fallback für andere Plattformen
    return (
      <TouchableOpacity
        style={[styles.dropZone, error && styles.dropZoneError]}
        onPress={() => document.getElementById("file-upload")?.click()}
      >
        {dropZoneContent}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kartenset hochladen</Text>
      {renderUploadZone()}
      {error && (
        <TouchableOpacity style={styles.retryButton} onPress={reset}>
          <Text style={styles.retryButtonText}>Erneut versuchen</Text>
        </TouchableOpacity>
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
      gap: spacing.medium,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
      marginBottom: spacing.small,
    },
    dropZone: {
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: colors.border,
      borderRadius: 8,
      padding: spacing.large,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card.background,
      minHeight: 200,
    },
    dropZoneActive: {
      borderColor: colors.primary,
      backgroundColor: colors.card.backgroundActive,
    },
    dropZoneError: {
      borderColor: colors.error,
      backgroundColor: colors.card.backgroundError,
    },
    dropZoneText: {
      color: colors.textSecondary,
      textAlign: "center",
      fontSize: 16,
    },
    uploadingContainer: {
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.medium,
      minHeight: 200,
    },
    uploadingText: {
      color: colors.text,
      textAlign: "center",
      fontSize: 16,
    },
    errorText: {
      color: colors.error,
      fontWeight: "500",
    },
    retryText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    retryButton: {
      backgroundColor: colors.primary,
      padding: spacing.small,
      borderRadius: 4,
      alignItems: "center",
    },
    retryButtonText: {
      color: colors.textOnPrimary,
      fontWeight: "500",
    },
  });
