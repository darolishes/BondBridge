import { CardSetValidator } from '../card-set-validator';
import type { ImportedCardSet } from '@types';

describe('CardSetValidator', () => {
  let validator: CardSetValidator;

  const mockExistingCardSet: ImportedCardSet = {
    packageName: 'Existing Set',
    description: 'An existing card set',
    image: 'existing.png',
    cards: [
      {
        id: '1',
        question: 'Existing question?',
        category: 'Test',
        followUps: [],
        difficulty: 1,
      },
    ],
    importedAt: new Date().toISOString(),
    path: 'imports/existing-set.json',
  };

  const validCardSetData = {
    packageName: 'New Set',
    description: 'A new card set',
    image: 'test.png',
    cards: [
      {
        question: 'Test question?',
        category: 'Test',
        followUps: ['Follow up 1'],
        difficulty: 2,
      },
    ],
  };

  beforeEach(async () => {
    validator = new CardSetValidator([mockExistingCardSet]);
  });

  describe('validateCardSet', () => {
    it('validates valid card sets', async () => {
      const result = await validator.validateCardSet(validCardSetData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('detects duplicate package names', async () => {
      const duplicateData = {
        ...validCardSetData,
        packageName: 'Existing Set',
      };

      await expect(validator.validateCardSet(duplicateData)).rejects.toThrow(
        'Card set "Existing Set" already exists'
      );
    });

    it('requires at least one card', async () => {
      const noCardsData = {
        ...validCardSetData,
        cards: [],
      };

      const result = await validator.validateCardSet(noCardsData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('validates card fields', async () => {
      const invalidCardData = {
        ...validCardSetData,
        cards: [
          {
            question: '', // Invalid: empty question
            category: '', // Invalid: empty category
            difficulty: 4, // Invalid: difficulty must be 1, 2, or 3
          },
        ],
      };

      const result = await validator.validateCardSet(invalidCardData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
    });
  });

  describe('sanitizeCardSet', () => {
    it('generates an ImportedCardSet with required fields', () => {
      const sanitized = validator.sanitizeCardSet(validCardSetData);

      expect(sanitized).toMatchObject({
        packageName: validCardSetData.packageName,
        description: validCardSetData.description,
        image: validCardSetData.image,
        importedAt: expect.any(String),
        path: expect.stringContaining(validCardSetData.packageName.toLowerCase()),
      });

      expect(sanitized.cards[0]).toMatchObject({
        id: expect.any(String),
        question: validCardSetData.cards[0].question,
        category: validCardSetData.cards[0].category,
        followUps: validCardSetData.cards[0].followUps,
        difficulty: validCardSetData.cards[0].difficulty,
      });
    });

    it('preserves existing card IDs', () => {
      const dataWithId = {
        ...validCardSetData,
        cards: [
          {
            ...validCardSetData.cards[0],
            id: 'existing-id',
          },
        ],
      };

      const sanitized = validator.sanitizeCardSet(dataWithId);
      expect(sanitized.cards[0].id).toBe('existing-id');
    });
  });

  describe('formatValidationErrors', () => {
    it('formats Zod errors into readable messages', async () => {
      const invalidData = {
        packageName: '',
        description: '',
        image: '',
        cards: [],
      };

      const result = await validator.validateCardSet(invalidData);
      expect(result.isValid).toBe(false);

      if (result.errors) {
        const formattedErrors = validator.formatValidationErrors(result.errors);
        expect(formattedErrors).toContain('packageName');
        expect(formattedErrors).toContain('cards');
      }
    });
  });
});
