# Story 7: Data Persistence Layer

## Status: Draft 📝

## Story

As a user,
I want my card sets and progress to be saved between sessions,
So that I can continue where I left off even after closing the app.

## Technical Implementation

The persistence layer will be implemented using AsyncStorage with a structured service layer:

1. Storage Service:

```typescript
// @services/storage/StorageService.ts
export class StorageService {
  private prefix = "bondbridge:";

  async saveItem<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      await AsyncStorage.setItem(`${this.prefix}${key}`, serialized);
    } catch (error) {
      console.error("Error saving data", error);
      throw new Error(`Failed to save data for key ${key}`);
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(`${this.prefix}${key}`);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error("Error retrieving data", error);
      throw new Error(`Failed to retrieve data for key ${key}`);
    }
  }
}
```

2. Card Set Repository:

```typescript
// @services/cardset/CardSetRepository.ts
export class CardSetRepository {
  private storageService: StorageService;
  private cardSetPrefix = "cardset:";

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  async saveCardSet(cardSet: CardSet): Promise<void> {
    await this.storageService.saveItem(
      `${this.cardSetPrefix}${cardSet.id}`,
      cardSet
    );
  }

  async getCardSet(id: string): Promise<CardSet | null> {
    return this.storageService.getItem<CardSet>(`${this.cardSetPrefix}${id}`);
  }
}
```

## Tasks

1. [ ] Create storage service
2. [ ] Implement card set repository
3. [ ] Implement progress repository
4. [ ] Add error handling and retry logic
5. [ ] Create storage hooks for components
6. [ ] Implement migration strategy for schema updates
7. [ ] Add data validation
8. [ ] Create storage cleanup utilities
9. [ ] Test storage functionality
10. [ ] Document storage API

## Test Cases

```typescript
// tests/services/StorageService.test.ts
describe("StorageService", () => {
  let storageService: StorageService;

  beforeEach(() => {
    AsyncStorage.clear();
    storageService = new StorageService();
  });

  it("saves and retrieves items correctly", async () => {
    const testData = { name: "Test Set", cards: [1, 2, 3] };
    await storageService.saveItem("test-key", testData);
    const retrieved = await storageService.getItem("test-key");
    expect(retrieved).toEqual(testData);
  });
});

// tests/services/CardSetRepository.test.ts
describe("CardSetRepository", () => {
  it("saves card sets with the correct prefix", async () => {
    const cardSet = { id: "test123", name: "Test Set", cards: [] };
    await cardSetRepository.saveCardSet(cardSet);
    expect(mockStorageService.saveItem).toHaveBeenCalledWith(
      "cardset:test123",
      cardSet
    );
  });
});
```

## Dependencies

- Story 1: Project Initialization

## Estimation

- Storage service: 2 hours
- Card set repository: 3 hours
- Progress repository: 3 hours
- Error handling: 2 hours
- Testing: 3 hours
  Total: 13 hours

## Notes

- Consider storage encryption for sensitive data
- Implement storage migration for future schema changes
- Add data validation before storage
- Consider implementing a caching layer for performance
