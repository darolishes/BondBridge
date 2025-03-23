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
  private schemaVersion = "1.0";

  constructor(cardSetRepository: CardSetRepository) {
    this.cardSetRepository = cardSetRepository;
  }

  async importFromJson(jsonString: string): Promise<CardSet> {
    try {
      const data = JSON.parse(jsonString);

      if (!this.validateCardSet(data)) {
        throw new Error("Invalid card set format");
      }

      // Generate a unique ID if none exists
      if (!data.id) {
        data.id = `cs_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      }

      const cardSet: CardSet = {
        id: data.id,
        name: data.name,
        description: data.description || "",
        author: data.author || "Unknown",
        cards: data.cards.map((card) => ({
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
      console.error("Import error:", error);
      throw new Error(`Failed to import card set: ${error.message}`);
    }
  }

  private validateCardSet(data: any): boolean {
    if (!data || typeof data !== "object") return false;
    if (!data.name || typeof data.name !== "string") return false;
    if (!Array.isArray(data.cards)) return false;

    for (const card of data.cards) {
      if (!card.question || typeof card.question !== "string") return false;
      if (!card.category || typeof card.category !== "string") return false;
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
        copyToCacheDirectory: true
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
      <Button
        label="Select File"
        onPress={handleImport}
        disabled={isLoading}
      />
    </View>
  );
};
```

## Tasks

1. [ ] Create JSON schema for card sets
2. [ ] Implement card set validation
3. [ ] Create import service
4. [ ] Implement file reading/writing
5. [ ] Add export functionality
6. [ ] Create import modal UI
7. [ ] Add error handling
8. [ ] Create import hooks
9. [ ] Test import/export flow
10. [ ] Document import format

## Test Cases

```typescript
// tests/services/CardSetImporter.test.ts
describe("CardSetImporter", () => {
  let importer: CardSetImporter;
  let mockRepository: jest.Mocked<CardSetRepository>;

  beforeEach(() => {
    mockRepository = {
      saveCardSet: jest.fn(),
      getCardSet: jest.fn(),
    } as unknown as jest.Mocked<CardSetRepository>;

    importer = new CardSetImporter(mockRepository);
  });

  it("validates card sets correctly", () => {
    const validJson = JSON.stringify({
      name: "Test Set",
      cards: [
        {
          question: "Test question?",
          category: "Icebreakers",
        },
      ],
    });

    expect(() => importer.importFromJson(validJson)).not.toThrow();
  });

  it("sanitizes imported data", async () => {
    const json = JSON.stringify({
      name: "Test Set",
      cards: [{ question: "Test?", category: "Test" }],
    });

    await importer.importFromJson(json);

    expect(mockRepository.saveCardSet).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test Set",
        description: "",
        author: "Unknown",
        cards: expect.arrayContaining([
          expect.objectContaining({
            question: "Test?",
            category: "Test",
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
