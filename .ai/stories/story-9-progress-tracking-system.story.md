# Story 9: Progress Tracking System

## Status: Draft 📝

## Story

As a user,
I want to track my progress through card sets,
So that I can see which cards I've viewed and review my conversation journey.

## Technical Implementation

The progress tracking system will monitor and store user interaction with cards:

1. Progress Tracking Service:

```typescript
// @services/progress/ProgressTracker.ts
export class ProgressTracker {
  private progressRepository: ProgressRepository;

  constructor(progressRepository: ProgressRepository) {
    this.progressRepository = progressRepository;
  }

  async trackCardView(setId: string, cardId: string): Promise<Progress> {
    let progress = await this.progressRepository.getProgress(setId);

    if (!progress) {
      progress = {
        seenCards: [],
        completedAt: null,
        lastViewedAt: new Date().toISOString(),
      };
    }

    if (!progress.seenCards.includes(cardId)) {
      progress.seenCards.push(cardId);
    }

    progress.lastViewedAt = new Date().toISOString();

    await this.progressRepository.saveProgress(setId, progress);
    return progress;
  }

  async getSetProgress(
    setId: string,
    totalCards: number
  ): Promise<Progress & { percentage: number }> {
    const progress = (await this.progressRepository.getProgress(setId)) || {
      seenCards: [],
      completedAt: null,
      lastViewedAt: null,
    };

    const percentage =
      totalCards > 0
        ? Math.floor((progress.seenCards.length / totalCards) * 100)
        : 0;

    if (percentage === 100 && !progress.completedAt) {
      progress.completedAt = new Date().toISOString();
      await this.progressRepository.saveProgress(setId, progress);
    }

    return { ...progress, percentage };
  }
}
```

2. Progress Hooks:

```typescript
// @hooks/useProgress.ts
export const useProgress = (setId: string) => {
  const [progress, setProgress] = useState<
    (Progress & { percentage: number }) | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getCardSet } = useCardSets();
  const progressTracker = new ProgressTracker(/* inject repository */);

  const loadProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      const cardSet = await getCardSet(setId);

      if (!cardSet) {
        throw new Error(`Card set with ID ${setId} not found`);
      }

      const progress = await progressTracker.getSetProgress(
        setId,
        cardSet.cards.length
      );
      setProgress(progress);
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setId, getCardSet, progressTracker]);

  const trackCardView = useCallback(
    async (cardId: string) => {
      try {
        await progressTracker.trackCardView(setId, cardId);
        loadProgress();
      } catch (error) {
        console.error("Error tracking card view:", error);
      }
    },
    [setId, progressTracker, loadProgress]
  );

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return { progress, isLoading, trackCardView, loadProgress };
};
```

3. Progress UI Components:

```typescript
// @components/Progress/ProgressBar.tsx
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  width = '100%'
}) => {
  const { theme } = useTheme();
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[
      styles.container,
      {
        height,
        width,
        backgroundColor: theme.background,
        borderColor: theme.accent2
      }
    ]}>
      <View
        style={[
          styles.progress,
          {
            width: `${clampedProgress}%`,
            backgroundColor: theme.accent1
          }
        ]}
      />
    </View>
  );
};
```

## Tasks

1. [ ] Create progress tracking service
2. [ ] Implement progress repository
3. [ ] Create progress data model
4. [ ] Implement card view tracking
5. [ ] Develop progress UI components
6. [ ] Create progress hooks
7. [ ] Add progress reset functionality
8. [ ] Implement progress summary screen
9. [ ] Test progress tracking
10. [ ] Document progress API

## Test Cases

```typescript
// tests/services/ProgressTracker.test.ts
describe("ProgressTracker", () => {
  let progressTracker: ProgressTracker;
  let mockRepository: jest.Mocked<ProgressRepository>;

  beforeEach(() => {
    mockRepository = {
      saveProgress: jest.fn(),
      getProgress: jest.fn(),
      resetProgress: jest.fn(),
    } as unknown as jest.Mocked<ProgressRepository>;

    progressTracker = new ProgressTracker(mockRepository);
  });

  it("tracks card views correctly", async () => {
    mockRepository.getProgress.mockResolvedValue({
      seenCards: ["card1", "card2"],
      completedAt: null,
      lastViewedAt: "2023-01-01T00:00:00Z",
    });

    await progressTracker.trackCardView("set1", "card3");

    expect(mockRepository.saveProgress).toHaveBeenCalledWith(
      "set1",
      expect.objectContaining({
        seenCards: ["card1", "card2", "card3"],
        completedAt: null,
      })
    );
  });

  it("calculates percentage correctly", async () => {
    mockRepository.getProgress.mockResolvedValue({
      seenCards: ["card1", "card2"],
      completedAt: null,
      lastViewedAt: "2023-01-01T00:00:00Z",
    });

    const progress = await progressTracker.getSetProgress("set1", 4);
    expect(progress.percentage).toBe(50);
  });
});
```

## Dependencies

- Story 7: Data Persistence Layer

## Estimation

- Progress service: 3 hours
- Progress hooks: 2 hours
- Progress UI components: 3 hours
- Integration with card view: 2 hours
- Testing: 2 hours
  Total: 12 hours

## Notes

- Consider analytics integration for tracking usage patterns
- Add data visualization for progress over time
- Implement achievements or rewards for completing sets
- Ensure proper error handling for all progress operations
