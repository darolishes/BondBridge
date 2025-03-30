import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CardSet } from "@common/types/card";
import type { PerformanceMetrics } from "@features/conversation-cards/hooks/useSwipePerformance";

interface BaseSwipeAction {
  cardId: string;
  direction: "left" | "right";
  timestamp: string;
}

interface SwipeActionWithMetrics extends BaseSwipeAction {
  metrics: PerformanceMetrics;
}

interface CardsState {
  sets: CardSet[];
  swipeActions: BaseSwipeAction[];
  currentSetId: string | null;
  performanceData: {
    averageFps: number;
    totalSwipes: number;
    lowPerformanceSwipes: number;
  };
}

const initialState: CardsState = {
  sets: [],
  swipeActions: [],
  currentSetId: null,
  performanceData: {
    averageFps: 60,
    totalSwipes: 0,
    lowPerformanceSwipes: 0,
  },
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCardSet: (state, action: PayloadAction<CardSet>) => {
      state.sets.push(action.payload);
    },
    registerSwipe: (state, action: PayloadAction<SwipeActionWithMetrics>) => {
      const { metrics, ...swipeAction } = action.payload;
      state.swipeActions.push(swipeAction);

      // Performance-Daten aktualisieren
      const { performanceData } = state;
      const newTotalSwipes = performanceData.totalSwipes + 1;

      // Durchschnittliche FPS neu berechnen
      const totalFps =
        performanceData.averageFps * performanceData.totalSwipes + metrics.fps;
      const newAverageFps = totalFps / newTotalSwipes;

      state.performanceData = {
        averageFps: newAverageFps,
        totalSwipes: newTotalSwipes,
        lowPerformanceSwipes:
          metrics.fps < 30
            ? performanceData.lowPerformanceSwipes + 1
            : performanceData.lowPerformanceSwipes,
      };
    },
    setCurrentSet: (state, action: PayloadAction<string>) => {
      state.currentSetId = action.payload;
    },
    clearSwipeHistory: (state) => {
      state.swipeActions = [];
      state.performanceData = {
        averageFps: 60,
        totalSwipes: 0,
        lowPerformanceSwipes: 0,
      };
    },
  },
});

export const { addCardSet, registerSwipe, setCurrentSet, clearSwipeHistory } =
  cardsSlice.actions;

export type { BaseSwipeAction, SwipeActionWithMetrics };
export default cardsSlice.reducer;
