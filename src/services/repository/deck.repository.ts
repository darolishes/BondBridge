import type { CardSet, ImportedCardSet, CardSetData } from '@types';
import { DeckValidator } from '@services/validation/deck.validator';

export interface DeckRepository {
  getAllDecks(): CardSetData[];
  getDeck(packageName: string): CardSetData | undefined;
  saveDeck(deck: ImportedCardSet): Promise<void>;
  deleteDeck(packageName: string): Promise<void>;
  getRawDecks(): ImportedCardSet[];
}

export class InMemoryDeckRepository implements DeckRepository {
  private decks: Map<string, ImportedCardSet> = new Map();
  private validator: DeckValidator;

  constructor() {
    this.validator = new DeckValidator();
  }

  getAllDecks(): CardSetData[] {
    return Array.from(this.decks.values()).map(deck => this.validator.toCardSetData(deck));
  }

  getRawDecks(): ImportedCardSet[] {
    return Array.from(this.decks.values());
  }

  getDeck(packageName: string): CardSetData | undefined {
    const deck = this.decks.get(packageName.toLowerCase());
    return deck ? this.validator.toCardSetData(deck) : undefined;
  }

  async saveDeck(deck: ImportedCardSet): Promise<void> {
    this.decks.set(deck.packageName.toLowerCase(), deck);
  }

  async deleteDeck(packageName: string): Promise<void> {
    this.decks.delete(packageName.toLowerCase());
  }
}
