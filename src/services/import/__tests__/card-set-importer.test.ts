import { CardSetImporter } from '../card-set-importer';
import { InMemoryCardSetRepository } from '@services/repository/card-set-repository';
import type { ImportedCardSet } from '@types';

describe('CardSetImporter', () => {
  let importer: CardSetImporter;
  let repository: InMemoryCardSetRepository;

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

  const validCardSetJson = JSON.stringify({
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
  });

  beforeEach(async () => {
    repository = new InMemoryCardSetRepository();
    await repository.saveCardSet(mockExistingCardSet);
    importer = new CardSetImporter(repository);
  });

  it('successfully imports valid card sets', async () => {
    const result = await importer.importFromJson(validCardSetJson);

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.packageName).toBe('New Set');
    expect(result.data?.cards[0].question).toBe('Test question?');
  });

  it('handles invalid JSON', async () => {
    const result = await importer.importFromJson('invalid json');

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('INVALID_JSON');
  });

  it('detects duplicate package names', async () => {
    const duplicateJson = JSON.stringify({
      ...JSON.parse(validCardSetJson),
      packageName: 'Existing Set',
    });

    const result = await importer.importFromJson(duplicateJson);

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('DUPLICATE');
  });

  it('validates card set schema', async () => {
    const invalidJson = JSON.stringify({
      packageName: 'Invalid Set',
      description: 'Missing cards array',
    });

    const result = await importer.importFromJson(invalidJson);

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('INVALID_SCHEMA');
  });

  it('validates card fields', async () => {
    const invalidCardJson = JSON.stringify({
      packageName: 'Invalid Cards',
      description: 'Invalid card fields',
      image: 'test.png',
      cards: [
        {
          question: '', // Invalid: empty question
          category: '', // Invalid: empty category
          difficulty: 4, // Invalid: difficulty must be 1, 2, or 3
        },
      ],
    });

    const result = await importer.importFromJson(invalidCardJson);

    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('INVALID_SCHEMA');
    expect(result.error?.message).toContain('question');
    expect(result.error?.message).toContain('category');
  });

  it('saves imported card set to repository', async () => {
    await importer.importFromJson(validCardSetJson);

    const savedCardSet = repository.getCardSet('New Set');
    expect(savedCardSet).toBeDefined();
    expect(savedCardSet?.packageName).toBe('New Set');
  });
});
