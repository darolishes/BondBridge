import { cardSetSchema, CardSetValidationResult } from '@utils/validation/card-set-schema';
import type { CardSet, ImportedCardSet } from '@types';
import { z } from 'zod';

export class CardSetValidator {
  private existingCardSets: Map<string, CardSet>;

  constructor(existingCardSets: CardSet[] = []) {
    this.existingCardSets = new Map(
      existingCardSets.map(set => [set.packageName.toLowerCase(), set])
    );
  }

  async validateCardSet(data: unknown): Promise<CardSetValidationResult> {
    try {
      const parsed = cardSetSchema.parse(data);

      // Check for duplicates
      if (this.existingCardSets.has(parsed.packageName.toLowerCase())) {
        throw new Error(`Card set "${parsed.packageName}" already exists`);
      }

      return { isValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error,
        };
      }
      throw error;
    }
  }

  sanitizeCardSet(data: unknown): ImportedCardSet {
    const parsed = cardSetSchema.parse(data);
    const now = new Date().toISOString();

    return {
      packageName: parsed.packageName,
      description: parsed.description,
      image: parsed.image,
      cards: parsed.cards.map(card => ({
        id: card.id || `card_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        category: card.category,
        question: card.question,
        followUps: card.followUps,
        difficulty: card.difficulty,
      })),
      importedAt: now,
      path: `imports/${parsed.packageName.toLowerCase().replace(/\s+/g, '-')}.json`,
    };
  }

  formatValidationErrors(errors: z.ZodError): string {
    return errors.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ');
  }
}
