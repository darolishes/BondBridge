import type { Progress, ProgressSummary, ProgressRepository } from '@types';

/**
 * Service for tracking and managing card set progress
 */
export class ProgressTracker {
  constructor(private progressRepository: ProgressRepository) {}

  /**
   * Tracks a card view and updates progress
   * @param setId The ID of the card set
   * @param cardId The ID of the viewed card
   * @returns Updated progress data
   */
  async trackCardView(setId: string, cardId: string): Promise<Progress> {
    let progress = await this.progressRepository.getProgress(setId);

    if (!progress) {
      progress = {
        seenCards: [],
        completedAt: null,
        lastViewedAt: null,
      };
    }

    if (!progress.seenCards.includes(cardId)) {
      progress.seenCards.push(cardId);
    }

    progress.lastViewedAt = new Date().toISOString();

    await this.progressRepository.saveProgress(setId, progress);
    return progress;
  }

  /**
   * Gets progress summary for a card set
   * @param setId The ID of the card set
   * @param totalCards Total number of cards in the set
   * @returns Progress summary including completion percentage
   */
  async getSetProgress(setId: string, totalCards: number): Promise<ProgressSummary> {
    const progress = (await this.progressRepository.getProgress(setId)) || {
      seenCards: [],
      completedAt: null,
      lastViewedAt: null,
    };

    const percentage =
      totalCards > 0 ? Math.floor((progress.seenCards.length / totalCards) * 100) : 0;

    // Mark as completed if all cards have been seen
    if (percentage === 100 && !progress.completedAt) {
      progress.completedAt = new Date().toISOString();
      await this.progressRepository.saveProgress(setId, progress);
    }

    return { ...progress, percentage };
  }

  /**
   * Resets progress for a card set
   * @param setId The ID of the card set
   */
  async resetProgress(setId: string): Promise<void> {
    await this.progressRepository.resetProgress(setId);
  }

  /**
   * Gets progress summary for all card sets
   * @param cardSetSizes Record of card set IDs to their total card count
   * @returns Record of set IDs to their progress summaries
   */
  async getAllProgress(
    cardSetSizes: Record<string, number>
  ): Promise<Record<string, ProgressSummary>> {
    const allProgress = await this.progressRepository.getAllProgress();

    return Object.entries(allProgress).reduce<Record<string, ProgressSummary>>(
      (acc, [setId, progress]) => {
        const totalCards = cardSetSizes[setId] || 0;
        const percentage =
          totalCards > 0 ? Math.floor((progress.seenCards.length / totalCards) * 100) : 0;

        acc[setId] = { ...progress, percentage };
        return acc;
      },
      {}
    );
  }
}
