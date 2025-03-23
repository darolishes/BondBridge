# Story 10: Offline Support

## Status: Draft 📝

## Story

As a user,
I want to use the app while offline and have my changes synchronized when I reconnect,
So that I can continue using the app regardless of internet connectivity.

## Technical Implementation

The offline support system will handle network state and change queuing:

1. Sync Manager:

```typescript
// @services/sync/SyncManager.ts
export interface Change {
  id: string;
  timestamp: string;
  type: "cardView" | "progress" | "import" | "delete";
  data: any;
  synced: boolean;
}

export class SyncManager {
  private storageService: StorageService;
  private changeQueueKey = "sync:changeQueue";
  private isOnline = true;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
    this.setupNetworkListener();
  }

  private setupNetworkListener() {
    NetInfo.addEventListener((state) => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected;

      if (wasOffline && this.isOnline) {
        this.syncPendingChanges();
      }
    });
  }

  async queueChange(
    change: Omit<Change, "id" | "timestamp" | "synced">
  ): Promise<void> {
    const changes = await this.getChangeQueue();

    const newChange: Change = {
      ...change,
      id: `change_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      synced: false,
    };

    changes.push(newChange);
    await this.storageService.saveItem(this.changeQueueKey, changes);

    if (this.isOnline) {
      await this.syncPendingChanges();
    }
  }

  private async getChangeQueue(): Promise<Change[]> {
    return (
      (await this.storageService.getItem<Change[]>(this.changeQueueKey)) || []
    );
  }

  private async syncPendingChanges(): Promise<void> {
    const changes = await this.getChangeQueue();
    const unsynced = changes.filter((change) => !change.synced);

    for (const change of unsynced) {
      try {
        await this.processChange(change);
        change.synced = true;
      } catch (error) {
        console.error(`Failed to sync change ${change.id}:`, error);
      }
    }

    await this.storageService.saveItem(this.changeQueueKey, changes);
  }

  private async processChange(change: Change): Promise<void> {
    switch (change.type) {
      case "cardView":
        await this.processCardView(change.data);
        break;
      case "progress":
        await this.processProgress(change.data);
        break;
      case "import":
        await this.processImport(change.data);
        break;
      case "delete":
        await this.processDelete(change.data);
        break;
      default:
        throw new Error(`Unknown change type: ${change.type}`);
    }
  }
}
```

2. Offline Hook:

```typescript
// @hooks/useOffline.ts
export const useOffline = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<number>(0);
  const syncManager = useMemo(() => new SyncManager(/* inject storage */), []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const loadPendingChanges = useCallback(async () => {
    const changes = await syncManager.getChangeQueue();
    setPendingChanges(changes.filter((c) => !c.synced).length);
  }, [syncManager]);

  useEffect(() => {
    loadPendingChanges();
  }, [loadPendingChanges]);

  return { isOffline, pendingChanges };
};
```

3. Offline UI Components:

```typescript
// @components/Offline/OfflineIndicator.tsx
export const OfflineIndicator: React.FC = () => {
  const { isOffline, pendingChanges } = useOffline();
  const { theme } = useTheme();

  if (!isOffline && pendingChanges === 0) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.error }]}>
      <Text style={[styles.text, { color: theme.text.onError }]}>
        {isOffline ? 'You are offline' : `Syncing ${pendingChanges} changes...`}
      </Text>
    </View>
  );
};
```

## Tasks

1. [ ] Create sync manager
2. [ ] Implement change queue system
3. [ ] Add network state monitoring
4. [ ] Create offline hooks
5. [ ] Develop offline UI components
6. [ ] Implement change processors
7. [ ] Add retry logic for failed syncs
8. [ ] Create conflict resolution system
9. [ ] Test offline functionality
10. [ ] Document offline API

## Test Cases

```typescript
// tests/services/SyncManager.test.ts
describe("SyncManager", () => {
  let syncManager: SyncManager;
  let mockStorageService: jest.Mocked<StorageService>;

  beforeEach(() => {
    mockStorageService = {
      saveItem: jest.fn(),
      getItem: jest.fn(),
    } as unknown as jest.Mocked<StorageService>;

    syncManager = new SyncManager(mockStorageService);
  });

  it("queues changes correctly", async () => {
    mockStorageService.getItem.mockResolvedValue([]);

    await syncManager.queueChange({
      type: "cardView",
      data: { setId: "set1", cardId: "card1" },
    });

    expect(mockStorageService.saveItem).toHaveBeenCalledWith(
      "sync:changeQueue",
      expect.arrayContaining([
        expect.objectContaining({
          type: "cardView",
          data: { setId: "set1", cardId: "card1" },
          synced: false,
        }),
      ])
    );
  });

  it("processes changes when coming online", async () => {
    mockStorageService.getItem.mockResolvedValue([
      {
        id: "change1",
        timestamp: "2024-01-01T00:00:00Z",
        type: "cardView",
        data: { setId: "set1", cardId: "card1" },
        synced: false,
      },
    ]);

    await syncManager.syncPendingChanges();

    expect(mockStorageService.saveItem).toHaveBeenCalledWith(
      "sync:changeQueue",
      expect.arrayContaining([
        expect.objectContaining({
          id: "change1",
          synced: true,
        }),
      ])
    );
  });
});

// tests/hooks/useOffline.test.tsx
describe("useOffline", () => {
  it("updates offline state correctly", () => {
    const { result } = renderHook(() => useOffline());

    act(() => {
      // Simulate going offline
      NetInfo.fetch.mockResolvedValueOnce({ isConnected: false });
    });

    expect(result.current.isOffline).toBe(true);
  });

  it("tracks pending changes", async () => {
    const { result } = renderHook(() => useOffline());

    await act(async () => {
      // Simulate having 2 pending changes
      mockSyncManager.getChangeQueue.mockResolvedValueOnce([
        { id: "change1", synced: false },
        { id: "change2", synced: false },
      ]);
    });

    expect(result.current.pendingChanges).toBe(2);
  });
});
```

## Dependencies

- Story 7: Data Persistence Layer
- Story 9: Progress Tracking System

## Estimation

- Sync manager: 4 hours
- Change queue system: 3 hours
- Network monitoring: 2 hours
- Offline UI: 2 hours
- Testing: 3 hours
  Total: 14 hours

## Notes

- Implement exponential backoff for sync retries
- Consider data conflicts during sync
- Add sync progress indicators
- Ensure proper error handling for network issues
