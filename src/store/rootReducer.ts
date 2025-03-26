import { combineReducers } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardsSlice";
import filtersReducer from "./slices/filtersSlice";
import settingsReducer from "./slices/settingsSlice";

// Combine all reducers into the root reducer
const rootReducer = combineReducers({
  cards: cardsReducer,
  filters: filtersReducer,
  settings: settingsReducer,
});

export default rootReducer;
