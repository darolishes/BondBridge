import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@theme/hooks";
import { useCardSets } from "../hooks/useCardSets";
import CardSetService from "../services/CardSetService";
import { CardSet } from "../types";
import * as DocumentPicker from "expo-document-picker";
import * as Clipboard from "expo-clipboard";

/**
 * CardSetManager Component
 * ------------------------
 * Provides UI for importing and managing card sets.
 * Supports importing from JSON files or pasting JSON.
 */
const CardSetManager: React.FC = () => {
  const { theme } = useTheme();
  const {
    cardSets,
    addCardSet,
    removeCardSet,
    setActiveCardSet,
    activeCardSet,
  } = useCardSets();
  const [loading, setLoading] = useState<boolean>(false);
  const [importModalVisible, setImportModalVisible] = useState<boolean>(false);
  const [jsonInput, setJsonInput] = useState<string>("");
  const [jsonInputError, setJsonInputError] = useState<string | null>(null);

  // Import card set from a file
  const handleImportFromFile = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setLoading(false);
        return;
      }

      const file = result.assets[0];
      const { cardSet, validationResult } = await CardSetService.importFromFile(
        file.uri
      );

      if (!validationResult.isValid) {
        const errorMessages = validationResult.errors
          .map((err) => err.message)
          .join("\n");
        Alert.alert(
          "Validation Failed",
          `The card set could not be imported:\n${errorMessages}`,
          [{ text: "OK" }]
        );
        setLoading(false);
        return;
      }

      if (cardSet) {
        const success = await addCardSet(cardSet);
        if (success) {
          Alert.alert(
            "Import Successful",
            `Card set "${cardSet.name}" with ${cardSet.cards.length} cards was imported successfully.`,
            [{ text: "OK" }]
          );
        } else {
          Alert.alert(
            "Import Failed",
            "A card set with this ID already exists.",
            [{ text: "OK" }]
          );
        }
      }
    } catch (error) {
      console.error("Error importing card set from file:", error);
      Alert.alert(
        "Import Failed",
        "An error occurred while importing the card set.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  // Import card set from JSON text
  const handleImportFromJson = async () => {
    if (!jsonInput.trim()) {
      setJsonInputError("Please enter valid JSON");
      return;
    }

    try {
      setLoading(true);
      const { cardSet, validationResult } =
        CardSetService.importFromJson(jsonInput);

      if (!validationResult.isValid) {
        const errorMessages = validationResult.errors
          .map((err) => err.message)
          .join("\n");
        setJsonInputError(`Validation Failed: ${errorMessages}`);
        setLoading(false);
        return;
      }

      if (cardSet) {
        const success = await addCardSet(cardSet);
        if (success) {
          setImportModalVisible(false);
          setJsonInput("");
          setJsonInputError(null);
          Alert.alert(
            "Import Successful",
            `Card set "${cardSet.name}" with ${cardSet.cards.length} cards was imported successfully.`,
            [{ text: "OK" }]
          );
        } else {
          setJsonInputError("A card set with this ID already exists.");
        }
      }
    } catch (error) {
      console.error("Error importing card set from JSON:", error);
      setJsonInputError("An error occurred while importing the card set.");
    } finally {
      setLoading(false);
    }
  };

  // Remove a card set
  const handleRemoveCardSet = (id: string, name: string) => {
    Alert.alert(
      "Remove Card Set",
      `Are you sure you want to remove "${name}"? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            const success = await removeCardSet(id);
            if (success) {
              Alert.alert("Success", `Card set "${name}" was removed.`);
            } else {
              Alert.alert("Error", "Failed to remove the card set.");
            }
          },
        },
      ]
    );
  };

  // Set active card set
  const handleSetActiveCardSet = (id: string | null) => {
    setActiveCardSet(id);
  };

  // Copy sample card set to clipboard
  const handleCopySample = async () => {
    const sampleJson = CardSetService.generateSampleCardSetJson();
    await Clipboard.setStringAsync(sampleJson);
    Alert.alert(
      "Copied to Clipboard",
      "A sample card set JSON has been copied to your clipboard. You can share this format with others."
    );
  };

  // Render a card set item
  const renderCardSetItem = ({ item }: { item: CardSet }) => {
    const isActive = activeCardSet?.id === item.id;

    return (
      <View
        style={[
          styles.cardSetItem,
          isActive && {
            borderColor: theme.colors.primary,
            borderWidth: 2,
          },
        ]}
      >
        <View style={styles.cardSetInfo}>
          <Text style={[styles.cardSetName, { color: theme.colors.text }]}>
            {item.name}
          </Text>
          <Text
            style={[
              styles.cardSetDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            {item.description}
          </Text>
          <Text
            style={[styles.cardSetMeta, { color: theme.colors.textSecondary }]}
          >
            {item.cards.length} cards • By {item.author} • v{item.version}
          </Text>
        </View>
        <View style={styles.cardSetActions}>
          <TouchableOpacity
            style={[
              styles.cardSetButton,
              {
                backgroundColor: isActive
                  ? theme.colors.card.border
                  : theme.colors.primary,
              },
            ]}
            onPress={() => handleSetActiveCardSet(isActive ? null : item.id)}
          >
            <Text style={styles.cardSetButtonText}>
              {isActive ? "Deactivate" : "Activate"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cardSetButton,
              {
                backgroundColor: theme.colors.error,
              },
            ]}
            onPress={() => handleRemoveCardSet(item.id, item.name)}
          >
            <Text style={styles.cardSetButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    header: {
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.typography.fontSizes.large,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.medium,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
    },
    actionsContainer: {
      flexDirection: "row",
      marginBottom: theme.spacing.lg,
    },
    actionButton: {
      flex: 1,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.small,
      backgroundColor: theme.colors.primary,
      marginRight: theme.spacing.sm,
      alignItems: "center",
      justifyContent: "center",
    },
    actionButtonText: {
      color: "#fff",
      fontWeight: "500",
    },
    cardSetsList: {
      flex: 1,
    },
    cardSetItem: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.medium,
      marginBottom: theme.spacing.md,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.card.border,
    },
    cardSetInfo: {
      marginBottom: theme.spacing.sm,
    },
    cardSetName: {
      fontSize: theme.typography.fontSizes.medium,
      fontWeight: "bold",
      marginBottom: 4,
    },
    cardSetDescription: {
      fontSize: theme.typography.fontSizes.small,
      marginBottom: 4,
    },
    cardSetMeta: {
      fontSize: theme.typography.fontSizes.small,
      opacity: 0.7,
    },
    cardSetActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing.sm,
    },
    cardSetButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: theme.borderRadius.small,
      marginLeft: theme.spacing.sm,
    },
    cardSetButtonText: {
      color: "#fff",
      fontSize: theme.typography.fontSizes.small,
      fontWeight: "500",
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.lg,
    },
    emptyStateText: {
      textAlign: "center",
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.medium,
      marginBottom: theme.spacing.md,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "90%",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.medium,
      padding: theme.spacing.lg,
      maxHeight: "80%",
    },
    modalTitle: {
      fontSize: theme.typography.fontSizes.large,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    inputContainer: {
      marginBottom: theme.spacing.md,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.small,
      borderWidth: 1,
      borderColor: jsonInputError
        ? theme.colors.error
        : theme.colors.card.border,
      padding: theme.spacing.sm,
      color: theme.colors.text,
      height: 200,
      textAlignVertical: "top",
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.fontSizes.small,
      marginTop: 4,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    modalButton: {
      flex: 1,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.small,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
    },
    modalPrimaryButton: {
      backgroundColor: theme.colors.primary,
    },
    modalSecondaryButton: {
      backgroundColor: theme.colors.card.border,
    },
    modalButtonText: {
      color: "#fff",
      fontWeight: "500",
    },
    loadingContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Card Set Manager</Text>
        <Text style={styles.subtitle}>
          Manage external card sets to enhance your conversation experience.
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleImportFromFile}
        >
          <Text style={styles.actionButtonText}>Import from File</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setImportModalVisible(true)}
        >
          <Text style={styles.actionButtonText}>Paste JSON</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleCopySample}
        >
          <Text style={styles.actionButtonText}>Copy Template</Text>
        </TouchableOpacity>
      </View>

      {cardSets.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No card sets imported yet. Import a card set to get started.
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.cardSetsList}
          data={cardSets}
          renderItem={renderCardSetItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Import JSON Modal */}
      <Modal
        visible={importModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImportModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Import Card Set</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={10}
                placeholder="Paste JSON here..."
                placeholderTextColor={theme.colors.textSecondary}
                value={jsonInput}
                onChangeText={(text) => {
                  setJsonInput(text);
                  setJsonInputError(null);
                }}
              />
              {jsonInputError && (
                <Text style={styles.errorText}>{jsonInputError}</Text>
              )}
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalSecondaryButton]}
                onPress={() => {
                  setImportModalVisible(false);
                  setJsonInput("");
                  setJsonInputError(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalPrimaryButton]}
                onPress={handleImportFromJson}
              >
                <Text style={styles.modalButtonText}>Import</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
    </View>
  );
};

export default CardSetManager;
