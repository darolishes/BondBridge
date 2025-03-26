import { Card, CardCategory, CardSet } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

/**
 * Keys for AsyncStorage
 */
const STORAGE_KEYS = {
  IMPORTED_CARD_SETS: "bondbrige_imported_card_sets",
};

/**
 * Error types for card set validation
 */
export enum CardSetValidationError {
  INVALID_FORMAT = "INVALID_FORMAT",
  MISSING_REQUIRED_FIELDS = "MISSING_REQUIRED_FIELDS",
  INVALID_CARDS = "INVALID_CARDS",
  DUPLICATE_ID = "DUPLICATE_ID",
}

/**
 * Validation result interface
 */
interface ValidationResult {
  isValid: boolean;
  errors: {
    type: CardSetValidationError;
    message: string;
    details?: any;
  }[];
}

/**
 * Service for managing card sets (loading, validation, integration)
 */
export class CardSetService {
  /**
   * Load card sets from storage
   */
  static async loadCardSets(): Promise<CardSet[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(
        STORAGE_KEYS.IMPORTED_CARD_SETS
      );
      if (jsonValue === null) {
        return [];
      }
      const cardSets = JSON.parse(jsonValue);

      // Process dates from JSON storage
      return cardSets.map((set: any) => ({
        ...set,
        created: new Date(set.created),
        modified: new Date(set.modified),
        cards: set.cards.map((card: any) => ({
          ...card,
          created: new Date(card.created),
        })),
      }));
    } catch (error) {
      console.error("Error loading card sets:", error);
      return [];
    }
  }

  /**
   * Save card sets to storage
   */
  static async saveCardSets(cardSets: CardSet[]): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(cardSets);
      await AsyncStorage.setItem(STORAGE_KEYS.IMPORTED_CARD_SETS, jsonValue);
      return true;
    } catch (error) {
      console.error("Error saving card sets:", error);
      return false;
    }
  }

  /**
   * Import card set from JSON file
   */
  static async importFromFile(
    fileUri: string
  ): Promise<{ cardSet: CardSet | null; validationResult: ValidationResult }> {
    try {
      const jsonContent = await FileSystem.readAsStringAsync(fileUri);
      const cardSet = JSON.parse(jsonContent);

      // Validate the card set
      const validationResult = this.validateCardSet(cardSet);

      if (!validationResult.isValid) {
        return { cardSet: null, validationResult };
      }

      // Process dates from JSON
      const processedCardSet: CardSet = {
        ...cardSet,
        created: new Date(cardSet.created),
        modified: new Date(cardSet.modified),
        cards: cardSet.cards.map((card: any) => ({
          ...card,
          created: new Date(card.created || new Date()),
        })),
      };

      return { cardSet: processedCardSet, validationResult };
    } catch (error) {
      console.error("Error importing card set:", error);
      return {
        cardSet: null,
        validationResult: {
          isValid: false,
          errors: [
            {
              type: CardSetValidationError.INVALID_FORMAT,
              message: "File could not be parsed as JSON",
              details: error,
            },
          ],
        },
      };
    }
  }

  /**
   * Import card set from JSON string
   */
  static importFromJson(jsonString: string): {
    cardSet: CardSet | null;
    validationResult: ValidationResult;
  } {
    try {
      const cardSet = JSON.parse(jsonString);

      // Validate the card set
      const validationResult = this.validateCardSet(cardSet);

      if (!validationResult.isValid) {
        return { cardSet: null, validationResult };
      }

      // Process dates from JSON
      const processedCardSet: CardSet = {
        ...cardSet,
        created: new Date(cardSet.created),
        modified: new Date(cardSet.modified),
        cards: cardSet.cards.map((card: any) => ({
          ...card,
          created: new Date(card.created || new Date()),
        })),
      };

      return { cardSet: processedCardSet, validationResult };
    } catch (error) {
      return {
        cardSet: null,
        validationResult: {
          isValid: false,
          errors: [
            {
              type: CardSetValidationError.INVALID_FORMAT,
              message: "String could not be parsed as JSON",
              details: error,
            },
          ],
        },
      };
    }
  }

  /**
   * Validate card set structure
   */
  static validateCardSet(cardSet: any): ValidationResult {
    const errors = [];

    // Check required fields
    const requiredFields = [
      "id",
      "name",
      "description",
      "cards",
      "version",
      "author",
    ];
    const missingFields = requiredFields.filter((field) => !cardSet[field]);

    if (missingFields.length > 0) {
      errors.push({
        type: CardSetValidationError.MISSING_REQUIRED_FIELDS,
        message: `Missing required fields: ${missingFields.join(", ")}`,
        details: missingFields,
      });
    }

    // Check cards array
    if (!Array.isArray(cardSet.cards)) {
      errors.push({
        type: CardSetValidationError.INVALID_CARDS,
        message: "Cards must be an array",
      });
    } else {
      // Validate each card
      const invalidCards: Array<{
        index: number;
        id: string;
        errors: string[];
      }> = [];
      const cardIds = new Set();

      cardSet.cards.forEach((card: any, index: number) => {
        const cardErrors = [];

        // Check required card fields
        const requiredCardFields = ["id", "question", "category", "difficulty"];
        const missingCardFields = requiredCardFields.filter(
          (field) => !card[field]
        );

        if (missingCardFields.length > 0) {
          cardErrors.push(
            `Missing required fields: ${missingCardFields.join(", ")}`
          );
        }

        // Check for duplicate IDs
        if (card.id) {
          if (cardIds.has(card.id)) {
            cardErrors.push(`Duplicate card ID: ${card.id}`);
          } else {
            cardIds.add(card.id);
          }
        }

        // Validate category
        const validCategories: CardCategory[] = [
          "icebreakers",
          "personality",
          "intimacy",
          "deepThoughts",
          "growth",
          "confessions",
        ];

        if (card.category && !validCategories.includes(card.category)) {
          cardErrors.push(`Invalid category: ${card.category}`);
        }

        // Validate difficulty
        if (card.difficulty !== undefined) {
          const difficulty = Number(card.difficulty);
          if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
            cardErrors.push(`Difficulty must be a number between 1 and 5`);
          }
        }

        if (cardErrors.length > 0) {
          invalidCards.push({
            index,
            id: card.id || `[Card at index ${index}]`,
            errors: cardErrors,
          });
        }
      });

      if (invalidCards.length > 0) {
        errors.push({
          type: CardSetValidationError.INVALID_CARDS,
          message: `Invalid cards found: ${invalidCards.length}`,
          details: invalidCards,
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if a card set with the given ID already exists
   */
  static async checkForDuplicateId(id: string): Promise<boolean> {
    const cardSets = await this.loadCardSets();
    return cardSets.some((set) => set.id === id);
  }

  /**
   * Add a new card set to storage
   */
  static async addCardSet(cardSet: CardSet): Promise<boolean> {
    try {
      // Check for duplicate ID
      const isDuplicate = await this.checkForDuplicateId(cardSet.id);
      if (isDuplicate) {
        return false;
      }

      // Get existing card sets
      const cardSets = await this.loadCardSets();

      // Add new card set
      const updatedCardSets = [...cardSets, cardSet];

      // Save updated card sets
      return await this.saveCardSets(updatedCardSets);
    } catch (error) {
      console.error("Error adding card set:", error);
      return false;
    }
  }

  /**
   * Remove a card set by ID
   */
  static async removeCardSet(id: string): Promise<boolean> {
    try {
      const cardSets = await this.loadCardSets();
      const updatedCardSets = cardSets.filter((set) => set.id !== id);

      // If no card set was removed, return false
      if (cardSets.length === updatedCardSets.length) {
        return false;
      }

      return await this.saveCardSets(updatedCardSets);
    } catch (error) {
      console.error("Error removing card set:", error);
      return false;
    }
  }

  /**
   * Generate a sample card set JSON string for export
   */
  static generateSampleCardSetJson(): string {
    const sampleCardSet: CardSet = {
      id: "sample-card-set",
      name: "Sample Card Set",
      description: "This is a sample card set generated for export",
      cards: [
        {
          id: "sample-1",
          question: "What is your favorite color?",
          category: "icebreakers",
          difficulty: 1,
          created: new Date(),
        },
        {
          id: "sample-2",
          question: "What are your goals for the next year?",
          category: "growth",
          difficulty: 3,
          followUpQuestions: [
            "How do you plan to achieve them?",
            "What obstacles might you face?",
          ],
          created: new Date(),
        },
      ],
      version: "1.0.0",
      author: "BondBridge App",
      created: new Date(),
      modified: new Date(),
    };

    return JSON.stringify(sampleCardSet, null, 2);
  }
}

export default CardSetService;
