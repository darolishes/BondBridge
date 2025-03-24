import { CardSetValidator } from '@services/validation/CardSetValidator';
import type { CardSet, ImportResult, ImportedCardSet } from '@types';
import { CardSetRepository } from '@services/repository/CardSetRepository';

export class CardSetImporter {
  private validator: CardSetValidator;

  constructor(private cardSetRepository: CardSetRepository) {
    this.validator = new CardSetValidator(this.cardSetRepository.getAllCardSets());
  }

  async importFromJson(jsonString: string): Promise<ImportResult> {
    try {
      // Parse JSON
      let data: unknown;
      try {
        data = JSON.parse(jsonString);
      } catch (error) {
        return {
          success: false,
          error: {
            code: 'INVALID_JSON',
            message: 'Invalid JSON format in card set file',
          },
        };
      }

      // Validate card set
      try {
        const validationResult = await this.validator.validateCardSet(data);
        if (!validationResult.isValid) {
          return {
            success: false,
            error: {
              code: 'INVALID_SCHEMA',
              message: this.validator.formatValidationErrors(validationResult.errors!),
            },
          };
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('already exists')) {
          return {
            success: false,
            error: {
              code: 'DUPLICATE',
              message: error.message,
            },
          };
        }
        throw error;
      }

      // Sanitize and save
      const cardSet = this.validator.sanitizeCardSet(data);
      await this.cardSetRepository.saveCardSet(cardSet);

      return {
        success: true,
        data: cardSet,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'FILE_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
        },
      };
    }
  }
}
