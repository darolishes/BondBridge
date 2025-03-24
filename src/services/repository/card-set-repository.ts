import type { CardSet, ImportedCardSet } from '@types';

export interface CardSetRepository {
  getAllCardSets(): CardSet[];
  getCardSet(packageName: string): CardSet | undefined;
  saveCardSet(cardSet: ImportedCardSet): Promise<void>;
  deleteCardSet(packageName: string): Promise<void>;
}

export class InMemoryCardSetRepository implements CardSetRepository {
  private cardSets: Map<string, CardSet> = new Map();

  getAllCardSets(): CardSet[] {
    return Array.from(this.cardSets.values());
  }

  getCardSet(packageName: string): CardSet | undefined {
    return this.cardSets.get(packageName.toLowerCase());
  }

  async saveCardSet(cardSet: ImportedCardSet): Promise<void> {
    this.cardSets.set(cardSet.packageName.toLowerCase(), cardSet);
  }

  async deleteCardSet(packageName: string): Promise<void> {
    this.cardSets.delete(packageName.toLowerCase());
  }
}
