# Progress Tracking System Specification

## Overview

This document outlines the technical specifications for the progress tracking system in BondBridge.

## Data Model

```typescript
interface Progress {
  // Unique identifier for the card set
  setId: string;

  // Array of viewed card IDs
  seenCards: string[];

  // Timestamp when all cards were viewed
  completedAt: string | null;

  // Last interaction timestamp
  lastViewedAt: string;

  // Category-specific progress
  categoryProgress: {
    [category: string]: {
      total: number;
      seen: number;
    };
  };

  // Achievement tracking
  achievements: {
    firstCard: boolean;
    completeSet: boolean;
    quickLearner: boolean; // Complete set within timeframe
    consistent: boolean; // Daily streak
  };

  // Statistics
  stats: {
    totalTimeSpent: number;
    averageTimePerCard: number;
    sessionsCount: number;
    lastSession: string;
  };
}

interface ProgressSummary {
  totalSets: number;
  completedSets: number;
  totalCards: number;
  seenCards: number;
  achievements: number;
  streak: number;
}
```

## Service Architecture

1. Progress Tracking Service:

   ```typescript
   class ProgressTracker {
     trackCardView(setId: string, cardId: string): Promise<Progress>;
     getSetProgress(setId: string): Promise<Progress>;
     getProgressSummary(): Promise<ProgressSummary>;
     resetProgress(setId: string): Promise<void>;
     updateAchievements(setId: string): Promise<Progress>;
   }
   ```

2. Progress Repository:
   ```typescript
   interface ProgressRepository {
     getProgress(setId: string): Promise<Progress | null>;
     saveProgress(setId: string, progress: Progress): Promise<void>;
     getAllProgress(): Promise<Progress[]>;
     deleteProgress(setId: string): Promise<void>;
     clearAllProgress(): Promise<void>;
   }
   ```

## Progress Calculation

1. Set Progress:

   ```typescript
   function calculateSetProgress(seenCards: string[], totalCards: number): number {
     return Math.floor((seenCards.length / totalCards) * 100);
   }
   ```

2. Category Progress:

   ```typescript
   function calculateCategoryProgress(
     seenCards: string[],
     cards: Card[],
     category: string
   ): { total: number; seen: number } {
     const categoryCards = cards.filter(card => card.category === category);
     const seenCategoryCards = seenCards.filter(id => categoryCards.some(card => card.id === id));

     return {
       total: categoryCards.length,
       seen: seenCategoryCards.length,
     };
   }
   ```

## Achievement System

1. Achievements:

   ```typescript
   const ACHIEVEMENTS = {
     FIRST_CARD: {
       id: 'first_card',
       title: 'First Step',
       description: 'View your first card',
     },
     COMPLETE_SET: {
       id: 'complete_set',
       title: 'Set Master',
       description: 'Complete an entire card set',
     },
     QUICK_LEARNER: {
       id: 'quick_learner',
       title: 'Quick Learner',
       description: 'Complete a set within 24 hours',
     },
     CONSISTENT: {
       id: 'consistent',
       title: 'Consistency King',
       description: 'Maintain a 7-day streak',
     },
   };
   ```

2. Achievement Checks:

   ```typescript
   function checkAchievements(progress: Progress): Achievement[] {
     const newAchievements: Achievement[] = [];

     // Check various conditions and add achievements
     if (!progress.achievements.firstCard && progress.seenCards.length > 0) {
       newAchievements.push(ACHIEVEMENTS.FIRST_CARD);
     }

     // More achievement checks...

     return newAchievements;
   }
   ```

## UI Components

1. Progress Bar:

   ```typescript
   interface ProgressBarProps {
     progress: number;
     animated?: boolean;
     showPercentage?: boolean;
     color?: string;
     height?: number;
   }
   ```

2. Progress Summary:
   ```typescript
   interface ProgressSummaryProps {
     summary: ProgressSummary;
     showAchievements?: boolean;
     onAchievementPress?: (achievement: Achievement) => void;
   }
   ```

## Storage Strategy

1. Local Storage:

   - Use AsyncStorage for progress data
   - Implement periodic backups
   - Handle storage limits

2. Data Structure:
   ```typescript
   const STORAGE_KEYS = {
     PROGRESS: '@bondbridge/progress/',
     ACHIEVEMENTS: '@bondbridge/achievements',
     SUMMARY: '@bondbridge/progress_summary',
   };
   ```

## Analytics Integration

1. Events to Track:

   - Card views
   - Set completions
   - Achievement unlocks
   - Progress resets
   - Session duration

2. Metrics:
   - Completion rate
   - Average time per card
   - Session frequency
   - Achievement distribution

## Error Handling

1. Progress Errors:

   ```typescript
   enum ProgressErrorCode {
     STORAGE_ERROR = 'STORAGE_ERROR',
     INVALID_PROGRESS = 'INVALID_PROGRESS',
     SET_NOT_FOUND = 'SET_NOT_FOUND',
     SYNC_ERROR = 'SYNC_ERROR',
   }
   ```

2. Error Recovery:
   - Implement progress recovery
   - Add automatic retries
   - Cache progress updates

## Performance Considerations

1. Optimization:

   - Batch progress updates
   - Cache progress calculations
   - Lazy load achievements
   - Optimize storage operations

2. Memory Management:
   - Clear old progress data
   - Limit stored history
   - Compress progress data

## Testing Strategy

1. Unit Tests:

   - Progress calculations
   - Achievement checks
   - Storage operations
   - Error handling

2. Integration Tests:
   - Progress tracking flow
   - Achievement system
   - Analytics integration
   - UI components

## Security

1. Data Protection:
   - Encrypt progress data
   - Validate progress updates
   - Prevent progress manipulation
   - Secure achievement system

## Future Considerations

1. Features:

   - Cloud sync
   - Progress sharing
   - Advanced analytics
   - Social features

2. Scalability:
   - Handle large card sets
   - Support multiple users
   - Improve performance
   - Add offline support
