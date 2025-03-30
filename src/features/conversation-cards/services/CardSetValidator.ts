import type { CardSet, Card } from "@common/types/card";

interface ValidationError {
  field: string;
  message: string;
  index?: number;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class CardSetValidator {
  private validateCard(card: Partial<Card>, index: number): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!card.id) {
      errors.push({
        field: "id",
        message: "Card ID is required",
        index,
      });
    }

    if (!card.question) {
      errors.push({
        field: "question",
        message: "Question text is required",
        index,
      });
    }

    if (!card.category) {
      errors.push({
        field: "category",
        message: "Category is required",
        index,
      });
    }

    if (
      typeof card.difficulty !== "number" ||
      card.difficulty < 1 ||
      card.difficulty > 5
    ) {
      errors.push({
        field: "difficulty",
        message: "Difficulty must be a number between 1 and 5",
        index,
      });
    }

    if (card.followUpQuestions && !Array.isArray(card.followUpQuestions)) {
      errors.push({
        field: "followUpQuestions",
        message: "Follow-up questions must be an array",
        index,
      });
    }

    return errors;
  }

  private validateMetadata(set: Partial<CardSet>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!set.id) {
      errors.push({
        field: "id",
        message: "Set ID is required",
      });
    }

    if (!set.name) {
      errors.push({
        field: "name",
        message: "Set name is required",
      });
    }

    if (!set.description) {
      errors.push({
        field: "description",
        message: "Set description is required",
      });
    }

    if (!set.version) {
      errors.push({
        field: "version",
        message: "Set version is required",
      });
    }

    return errors;
  }

  public validate(data: unknown): ValidationResult {
    const errors: ValidationError[] = [];

    // Prüfe, ob es ein valides JSON-Objekt ist
    if (!data || typeof data !== "object") {
      return {
        isValid: false,
        errors: [
          {
            field: "json",
            message: "Invalid JSON structure",
          },
        ],
      };
    }

    const cardSet = data as Partial<CardSet>;

    // Validiere Metadaten
    errors.push(...this.validateMetadata(cardSet));

    // Validiere Cards Array
    if (!cardSet.cards || !Array.isArray(cardSet.cards)) {
      errors.push({
        field: "cards",
        message: "Cards must be an array",
      });
    } else {
      cardSet.cards.forEach((card, index) => {
        errors.push(...this.validateCard(card, index));
      });
    }

    // Validiere eindeutige IDs
    if (cardSet.cards && Array.isArray(cardSet.cards)) {
      const ids = new Set<string>();
      cardSet.cards.forEach((card, index) => {
        if (card.id) {
          if (ids.has(card.id)) {
            errors.push({
              field: "id",
              message: `Duplicate card ID: ${card.id}`,
              index,
            });
          }
          ids.add(card.id);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public summarizeErrors(result: ValidationResult): string {
    if (result.isValid) {
      return "Validation successful";
    }

    return result.errors
      .map((error) => {
        const location =
          error.index !== undefined ? `[Card ${error.index}] ` : "";
        return `${location}${error.field}: ${error.message}`;
      })
      .join("\n");
  }
}

export type { ValidationResult, ValidationError };
