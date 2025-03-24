# Story 8: Card Set Import System

## Status: Draft 📝

## Story

As a user,
I want to import custom card sets from JSON files,
So that I can expand my collection with community-created content.

## Technical Implementation

The import system will handle file reading, validation, and data sanitization:

1. Import/Export Service:

```typescript
// @services/import/CardSetImporter.ts
export class CardSetImporter {
  private cardSetRepository: CardSetRepository;
  private schemaVersion = '1.0';

  constructor(cardSetRepository: CardSetRepository) {
    this.cardSetRepository = cardSetRepository;
  }

  async importFromJson(jsonString: string): Promise<CardSet> {
    try {
      const data = JSON.parse(jsonString);

      if (!this.validateCardSet(data)) {
        throw new Error('Invalid card set format');
      }

      // Generate a unique ID if none exists
      if (!data.id) {
        data.id = `cs_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      }

      const cardSet: CardSet = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        author: data.author || 'Unknown',
        cards: data.cards.map(card => ({
          id: card.id || `card_${Math.random().toString(36).substring(2, 9)}`,
          question: card.question,
          category: card.category,
          followUps: card.followUps || [],
          difficulty: card.difficulty || 1,
        })),
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        schemaVersion: this.schemaVersion,
      };

      await this.cardSetRepository.saveCardSet(cardSet);
      return cardSet;
    } catch (error) {
      console.error('Import error:', error);
      throw new Error(`Failed to import card set: ${error.message}`);
    }
  }

  private validateCardSet(data: any): boolean {
    if (!data || typeof data !== 'object') return false;
    if (!data.name || typeof data.name !== 'string') return false;
    if (!Array.isArray(data.cards)) return false;

    for (const card of data.cards) {
      if (!card.question || typeof card.question !== 'string') return false;
      if (!card.category || typeof card.category !== 'string') return false;
    }

    return true;
  }
}
```

2. Import Modal:

```typescript
// @screens/Import/ImportModal.tsx
export const ImportModal = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { importCardSet } = useCardSets();
  const { theme } = useTheme();

  const handleImport = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        const cardSet = await importCardSet(result.uri);
        navigation.goBack();
      }
    } catch (err) {
      setError(err.message || 'Failed to import card set');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text.primary }]}>Import Card Set</Text>
      <Button label="Select File" onPress={handleImport} disabled={isLoading} />
    </View>
  );
};
```

## Image Management Integration

- Integrated new ImageWithPlaceholder component for card set images
- Added performance tracking for imported images
- Implemented optimized image formats (WebP)
- Added loading states and error handling

```typescript
// Example of image handling in card set import
const handleImageImport = async (imageUrl: string) => {
  imageLoadTracker.startTracking(imageUrl);
  try {
    // Image import logic
    imageLoadTracker.endTracking(imageUrl, true);
  } catch (error) {
    imageLoadTracker.endTracking(imageUrl, false, error);
  }
};
```

## Updates (March 24, 2024)

### ImportButton Stories Enhancement

- Added loading state indicator during import operations
- Improved error handling visualization with consistent styling
- Extracted common message rendering logic to reduce duplication
- Added comprehensive error state coverage for all possible scenarios

### Technical Details

#### MessageRenderer Component

- Handles both loading and message states
- Provides consistent styling for success/error messages
- Improves code maintainability and reduces duplication
- Follows atomic design principles

#### Error States Coverage

- Network errors (FILE_ERROR)
- Invalid JSON format (INVALID_JSON)
- Duplicate card sets (DUPLICATE)
- Schema validation errors (INVALID_SCHEMA)

#### Loading State Management

- Visual feedback during async operations
- Consistent loading indicator placement
- Clear state transitions
- Improved user experience

### Next Steps

- Add unit tests for ImportButton component
- Implement E2E tests for import flows
- Document error handling patterns
- Consider adding retry mechanism for failed imports

## Tasks

1. [x] Create JSON schema for card sets
   - ✅ Define core schema structure
   - ✅ Document validation rules
   - ✅ Add example card set
   - ✅ Document security considerations
2. [ ] Implement card set validation
   - [ ] Create schema validator utility
   - [ ] Add sanitization functions
   - [ ] Implement version checking
   - [ ] Add duplicate package detection
3. [ ] Create import service
   - [ ] Implement file size checks
   - [ ] Add async processing
   - [ ] Create error mapping
   - [ ] Add logging system
4. [ ] Implement file reading/writing
   - [ ] Add Document Picker integration
   - [ ] Handle file permissions
   - [ ] Implement file cleanup
   - [ ] Add progress tracking
5. [ ] Add export functionality
   - [ ] Create export service
   - [ ] Add file saving
   - [ ] Implement sharing
   - [ ] Add export options
6. [ ] Create import modal UI
   - [ ] Design file selection flow
   - [ ] Add progress indicators
   - [ ] Create error displays
   - [ ] Add success feedback
7. [ ] Add error handling
   - [ ] Create error types
   - [ ] Add user-friendly messages
   - [ ] Implement recovery options
   - [ ] Add error logging
8. [ ] Create import hooks
   - [ ] Implement useImport hook
   - [ ] Add progress tracking
   - [ ] Create validation hook
   - [ ] Add error handling
9. [ ] Test import/export flow
   - [ ] Unit test validation
   - [ ] Test file handling
   - [ ] Integration tests
   - [ ] UI component tests
10. [ ] Document import format
    - [ ] Create user guide
    - [ ] Add examples
    - [ ] Document best practices
    - [ ] Add troubleshooting guide

## Test Cases

```typescript
// tests/services/CardSetImporter.test.ts
describe('CardSetImporter', () => {
  let importer: CardSetImporter;
  let mockRepository: jest.Mocked<CardSetRepository>;

  beforeEach(() => {
    mockRepository = {
      saveCardSet: jest.fn(),
      getCardSet: jest.fn(),
    } as unknown as jest.Mocked<CardSetRepository>;

    importer = new CardSetImporter(mockRepository);
  });

  it('validates card sets correctly', () => {
    const validJson = JSON.stringify({
      name: 'Test Set',
      cards: [
        {
          question: 'Test question?',
          category: 'Icebreakers',
        },
      ],
    });

    expect(() => importer.importFromJson(validJson)).not.toThrow();
  });

  it('sanitizes imported data', async () => {
    const json = JSON.stringify({
      name: 'Test Set',
      cards: [{ question: 'Test?', category: 'Test' }],
    });

    await importer.importFromJson(json);

    expect(mockRepository.saveCardSet).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Set',
        description: '',
        author: 'Unknown',
        cards: expect.arrayContaining([
          expect.objectContaining({
            question: 'Test?',
            category: 'Test',
            followUps: [],
            difficulty: 1,
          }),
        ]),
      })
    );
  });
});
```

## Dependencies

- Story 7: Data Persistence Layer

## Estimation

- JSON schema and validation: 3 hours
- Import/export service: 4 hours
- File handling: 2 hours
- Import UI: 3 hours
- Testing: 3 hours
  Total: 15 hours

## Notes

- Consider security implications of importing external files
- Validate all imports against schema before saving
- Add version handling for future schema changes
- Document the import format for community created card sets

## Related Stories

- Story 12: Image System Enhancement
- Story 10: Offline Support
