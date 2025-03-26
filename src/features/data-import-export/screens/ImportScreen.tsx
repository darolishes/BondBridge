import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import { createThemedStyles } from "@theme/useTheme";
import { Theme } from "@theme/themes";
import { ScreenProps } from "@navigation/types";

/**
 * ImportScreen
 * ------------
 * Screen zum Importieren von Kartensammlungen.
 * Ermöglicht das Hochladen von Dateien und Konfigurieren von Import-Optionen.
 *
 * @component
 * @screen
 * @feature data-import-export
 */
const ImportScreen: React.FC<ScreenProps["ImportData"]> = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = useStyles();

  const handleImportPress = () => {
    alert("Import-Funktion wird implementiert!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Karten importieren</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Hier können Sie Kartensammlungen aus verschiedenen Quellen
          importieren:
        </Text>
        <Text style={styles.bulletPoint}>• JSON-Dateien</Text>
        <Text style={styles.bulletPoint}>• CSV-Dateien</Text>
        <Text style={styles.bulletPoint}>• Andere BondBridge-Nutzer</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Datei auswählen"
          onPress={handleImportPress}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>Import-Optionen</Text>
        {/* Hier werden später Checkboxen für Import-Optionen hinzugefügt */}
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizes.xlarge,
    fontWeight: "700" as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: "center" as const,
  },
  infoBox: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
  infoText: {
    fontSize: theme.typography.fontSizes.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  bulletPoint: {
    fontSize: theme.typography.fontSizes.medium,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  buttonContainer: {
    marginVertical: theme.spacing.lg,
    alignItems: "center" as const,
  },
  optionsContainer: {
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.large,
    fontWeight: "600" as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
});

const useStyles = createThemedStyles(createStyles);

export default ImportScreen;
