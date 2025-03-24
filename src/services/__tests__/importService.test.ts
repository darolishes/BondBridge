import { validateCardSet } from '../validation';
import type { CardSet } from '../../types/cardSet';

describe('Card Set Validation', () => {
  const validCardSet: CardSet = {
    packageName: 'Test Set',
    description: 'A test card set',
    image: 'test.png',
    cards: [
      {
        id: 'test-1',
        category: 'Test',
        question: 'Test question?',
        followUps: ['Follow up 1'],
        difficulty: 1,
      },
    ],
  };

  it('should validate a correct card set', () => {
    const result = validateCardSet(validCardSet);
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should reject an invalid card set without packageName', () => {
    const invalidSet = {
      ...validCardSet,
      packageName: '',
    };
    const result = validateCardSet(invalidSet);
    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('INVALID_SCHEMA');
  });

  it('should reject an invalid card set with wrong difficulty', () => {
    const invalidSet = {
      ...validCardSet,
      cards: [
        {
          ...validCardSet.cards[0],
          difficulty: 4,
        },
      ],
    };
    const result = validateCardSet(invalidSet);
    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('INVALID_SCHEMA');
  });

  it('should reject an empty cards array', () => {
    const invalidSet = {
      ...validCardSet,
      cards: [],
    };
    const result = validateCardSet(invalidSet);
    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('INVALID_SCHEMA');
  });

  it('should reject invalid JSON', () => {
    const result = validateCardSet('invalid json');
    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('INVALID_JSON');
  });
});
