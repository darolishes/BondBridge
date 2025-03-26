import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../index";
import { getData, storeData } from "@common/utils/storage";
import { Card, CardSet, CardStatus } from "@common/types/card";

// State interface
interface CardsState {
  allCards: Record<string, Card>;
  activeCardId: string | null;
  cardOrder: string[];
  filteredCardIds: string[];
  cardSets: CardSet[];
  activeCardSetId: string | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: CardsState = {
  allCards: {},
  activeCardId: null,
  cardOrder: [],
  filteredCardIds: [],
  cardSets: [],
  activeCardSetId: null,
  loading: "idle",
  error: null,
};

// Async thunks
export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (_, { rejectWithValue }) => {
    try {
      const storedCards = await getData("cards");
      return storedCards ? JSON.parse(storedCards) : [];
    } catch (error) {
      return rejectWithValue("Failed to load cards");
    }
  }
);

export const fetchCardSets = createAsyncThunk(
  "cards/fetchCardSets",
  async (_, { rejectWithValue }) => {
    try {
      const storedCardSets = await getData("cardSets");
      return storedCardSets ? JSON.parse(storedCardSets) : [];
    } catch (error) {
      return rejectWithValue("Failed to load card sets");
    }
  }
);

// Save cards
export const saveCards = createAsyncThunk(
  "cards/saveCards",
  async (cards: Card[], { rejectWithValue }) => {
    try {
      await storeData("cards", JSON.stringify(cards));
      return cards;
    } catch (error) {
      return rejectWithValue("Failed to save cards");
    }
  }
);

// Slice
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // Set active card
    setActiveCard: (state, action: PayloadAction<string>) => {
      state.activeCardId = action.payload;
    },

    // Move to next card
    nextCard: (state) => {
      if (!state.activeCardId || state.filteredCardIds.length === 0) return;

      const currentIndex = state.filteredCardIds.indexOf(state.activeCardId);
      if (currentIndex < state.filteredCardIds.length - 1) {
        state.activeCardId = state.filteredCardIds[currentIndex + 1];
      }
    },

    // Move to previous card
    previousCard: (state) => {
      if (!state.activeCardId || state.filteredCardIds.length === 0) return;

      const currentIndex = state.filteredCardIds.indexOf(state.activeCardId);
      if (currentIndex > 0) {
        state.activeCardId = state.filteredCardIds[currentIndex - 1];
      }
    },

    // Add a card
    addCard: (state, action: PayloadAction<Card>) => {
      const card = action.payload;
      state.allCards[card.id] = card;
      if (!state.cardOrder.includes(card.id)) {
        state.cardOrder.push(card.id);
        state.filteredCardIds.push(card.id);
      }
    },

    // Update a card
    updateCard: (state, action: PayloadAction<Card>) => {
      const card = action.payload;
      if (state.allCards[card.id]) {
        state.allCards[card.id] = card;
      }
    },

    // Remove a card
    removeCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      delete state.allCards[cardId];
      state.cardOrder = state.cardOrder.filter((id) => id !== cardId);
      state.filteredCardIds = state.filteredCardIds.filter(
        (id) => id !== cardId
      );

      if (state.activeCardId === cardId) {
        state.activeCardId = state.filteredCardIds[0] || null;
      }
    },

    // Set card status
    setCardStatus: (
      state,
      action: PayloadAction<{ cardId: string; status: CardStatus }>
    ) => {
      const { cardId, status } = action.payload;
      if (state.allCards[cardId]) {
        // This would normally update a status field, but our Card interface doesn't have it yet
        // We would add that field to the Card type if needed
      }
    },

    // Add a card set
    addCardSet: (state, action: PayloadAction<CardSet>) => {
      const cardSet = action.payload;

      // Check if the set already exists
      const existingSetIndex = state.cardSets.findIndex(
        (set) => set.id === cardSet.id
      );
      if (existingSetIndex >= 0) {
        state.cardSets[existingSetIndex] = cardSet;
      } else {
        state.cardSets.push(cardSet);
      }

      // Add all cards from the set to the collection
      cardSet.cards.forEach((card) => {
        state.allCards[card.id] = card;
        if (!state.cardOrder.includes(card.id)) {
          state.cardOrder.push(card.id);
          state.filteredCardIds.push(card.id);
        }
      });
    },

    // Remove a card set
    removeCardSet: (state, action: PayloadAction<string>) => {
      const cardSetId = action.payload;

      // Find the card set to remove
      const cardSetIndex = state.cardSets.findIndex(
        (set) => set.id === cardSetId
      );
      if (cardSetIndex === -1) return;

      const cardSet = state.cardSets[cardSetIndex];

      // Remove all cards from this set
      const cardIdsToRemove = cardSet.cards.map((card) => card.id);

      // Filter out cards from this set
      cardIdsToRemove.forEach((cardId) => {
        delete state.allCards[cardId];
      });

      state.cardOrder = state.cardOrder.filter(
        (id) => !cardIdsToRemove.includes(id)
      );
      state.filteredCardIds = state.filteredCardIds.filter(
        (id) => !cardIdsToRemove.includes(id)
      );

      // Remove the set
      state.cardSets.splice(cardSetIndex, 1);

      // Update active card if needed
      if (state.activeCardId && cardIdsToRemove.includes(state.activeCardId)) {
        state.activeCardId = state.filteredCardIds[0] || null;
      }

      // Update active card set if needed
      if (state.activeCardSetId === cardSetId) {
        state.activeCardSetId = state.cardSets[0]?.id || null;
      }
    },

    // Set active card set
    setActiveCardSet: (state, action: PayloadAction<string | null>) => {
      state.activeCardSetId = action.payload;

      // If a set is selected, filter cards to only show from that set
      if (action.payload) {
        const activeSet = state.cardSets.find(
          (set) => set.id === action.payload
        );
        if (activeSet) {
          const setCardIds = activeSet.cards.map((card) => card.id);
          state.filteredCardIds = state.cardOrder.filter((id) =>
            setCardIds.includes(id)
          );
          state.activeCardId = state.filteredCardIds[0] || null;
        }
      } else {
        // If no set is selected, show all cards
        state.filteredCardIds = [...state.cardOrder];
        state.activeCardId = state.filteredCardIds[0] || null;
      }
    },

    // Update filtered card IDs (usually called from filter actions)
    setFilteredCardIds: (state, action: PayloadAction<string[]>) => {
      state.filteredCardIds = action.payload;

      // Update active card if needed
      if (
        !state.activeCardId ||
        !state.filteredCardIds.includes(state.activeCardId)
      ) {
        state.activeCardId = state.filteredCardIds[0] || null;
      }
    },
  },
  extraReducers: (builder) => {
    // Handle fetch cards
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<Card[]>) => {
        state.loading = "succeeded";

        // Convert array to record
        const cardsRecord: Record<string, Card> = {};
        const cardIds: string[] = [];

        action.payload.forEach((card) => {
          cardsRecord[card.id] = card;
          cardIds.push(card.id);
        });

        state.allCards = cardsRecord;
        state.cardOrder = cardIds;
        state.filteredCardIds = cardIds;
        state.activeCardId = cardIds[0] || null;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = "failed";
        state.error = (action.payload as string) || "Failed to load cards";
      });

    // Handle fetch card sets
    builder
      .addCase(fetchCardSets.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchCardSets.fulfilled,
        (state, action: PayloadAction<CardSet[]>) => {
          state.loading = "succeeded";
          state.cardSets = action.payload;
        }
      )
      .addCase(fetchCardSets.rejected, (state, action) => {
        state.loading = "failed";
        state.error = (action.payload as string) || "Failed to load card sets";
      });
  },
});

// Export actions
export const {
  setActiveCard,
  nextCard,
  previousCard,
  addCard,
  updateCard,
  removeCard,
  setCardStatus,
  addCardSet,
  removeCardSet,
  setActiveCardSet,
  setFilteredCardIds,
} = cardsSlice.actions;

// Selectors
export const selectAllCards = (state: RootState) => state.cards.allCards;
export const selectCardsByIds = (state: RootState, ids: string[]) =>
  ids.map((id) => state.cards.allCards[id]).filter(Boolean);
export const selectActiveCard = (state: RootState) =>
  state.cards.activeCardId
    ? state.cards.allCards[state.cards.activeCardId]
    : null;
export const selectFilteredCards = createSelector(
  (state: RootState) => state.cards.filteredCardIds,
  (state: RootState) => state.cards.allCards,
  (filteredCardIds, allCards) => filteredCardIds.map((id) => allCards[id])
);
export const selectCardSets = (state: RootState) => state.cards.cardSets;
export const selectActiveCardSet = (state: RootState) =>
  state.cards.activeCardSetId
    ? state.cards.cardSets.find(
        (set: CardSet) => set.id === state.cards.activeCardSetId
      ) || null
    : null;
export const selectActiveCardIndex = (state: RootState) => {
  if (!state.cards.activeCardId) return -1;
  return state.cards.filteredCardIds.indexOf(state.cards.activeCardId);
};
export const selectCardCount = (state: RootState) =>
  state.cards.filteredCardIds.length;

export default cardsSlice.reducer;
