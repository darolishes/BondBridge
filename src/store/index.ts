import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./rootReducer";
import { RootState, AppDispatch } from "./types";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cards", "settings"], // Only persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with middleware configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Re-export types
export type { RootState, AppDispatch };
