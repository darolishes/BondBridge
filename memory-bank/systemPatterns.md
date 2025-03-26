# System Patterns & Conventions

Version: 1.3.0
Last Updated: 2025-03-26 14:48:30
Status: 🟢 Active

## Naming Conventions 📝

### Components & Files

- PascalCase für Component-Namen: `ConversationCard.tsx`, `CategoryFilter.tsx`
- PascalCase für Component-Files: `ConversationCard.tsx`, `CardDeck.tsx`
- Feature-Prefix wo sinnvoll: `Card`, `Cards`, `Conversation`
- Klare Suffixe für spezielle Component-Typen:
  - Screens: `CardsScreen.tsx`, `FavoritesScreen.tsx`
  - Stacks: `CardStack.tsx`, `SettingsStack.tsx`
  - Tests: `ConversationCard.test.tsx`, `CardDeck.test.tsx`
  - Redux: `cardsSlice.ts`, `categoriesSlice.ts`

### Functions & Variables

- camelCase für Funktionen: `handleSwipe()`, `filterCardsByCategory()`
- camelCase für Variablen: `activeCategories`, `currentCardIndex`
- Boolean-Variablen mit is/has/should Präfix: `isLoading`, `hasSeenIntro`, `shouldShowFollowUp`
- Event Handler mit handle-Präfix: `handleSwipe`, `handleCategorySelect`

### Files & Directories

- kebab-case für Verzeichnisse: `features/conversation-cards/`
- camelCase für Utility-Functions: `utils/animationHelpers.ts`
- PascalCase für Component-Exports: `export { ConversationCard }`

## Project Structure 🏗️

Feature-basierte Architektur mit folgendem Layout:

```
src/
├── app/
│   ├── store.ts         # Redux store configuration
│   ├── rootReducer.ts   # Root reducer
│   └── App.tsx          # Main App component
├── features/
│   ├── conversation-cards/
│   │   ├── components/  # Card-related components
│   │   ├── hooks/       # Custom hooks for cards
│   │   ├── screens/     # Card-related screens
│   │   ├── utils/       # Card-specific utilities
│   │   └── cards.slice.ts # Redux slice for cards
│   └── settings/
│       ├── components/
│       ├── screens/
│       └── settings.slice.ts
├── navigation/
│   ├── AppNavigator.tsx # Main navigation container
│   ├── CardStack.tsx    # Card-related navigation
│   └── SettingsStack.tsx # Settings navigation
├── common/
│   ├── components/      # Shared components
│   ├── hooks/           # Shared hooks
│   └── utils/           # Shared utilities
├── theme/
│   ├── ThemeProvider.tsx # Theme provider
│   ├── themes.ts         # Theme definitions
│   └── useTheme.ts       # Theme hook
└── services/
    ├── storage/         # AsyncStorage services
    └── api/             # API services
```

## Coding Standards 💻

### TypeScript

- Strict mode aktiviert
- Explizite Typdefinitionen für Props: `type CardProps = {...}`
- Interfaces für komplexe Datenmodelle: `interface ConversationCard {...}`
- Immutabilität bevorzugen: Spread-Operator, map, filter statt direkter Mutation

### React Patterns

- Functional Components bevorzugen
- Hooks für State und Side Effects
- Custom Hooks für wiederverwendbare Logik
- Memoization für teure Berechnungen (useMemo, useCallback)

### Testing

- Jest für Unit Tests
- React Native Testing Library für Component Tests
- Mockup von Abhängigkeiten wie Navigation und Redux

### Code Quality

- ESLint mit React/React Native Config
- Prettier für Codeformatierung

## State Management 🧠

### Redux Toolkit

- Slices für Feature-spezifische State: `cardsSlice`, `settingsSlice`
- Selectors für State-Zugriff: `selectFilteredCards`, `selectActiveCategories`
- Thunks für Async Actions: `fetchCards`, `saveCardProgress`
- Immutability mit createSlice und immer

#### Cards Slice Pattern

```typescript
// Beispiel für cardsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationCard, CardCategory } from "./types";

interface CardsState {
  items: ConversationCard[];
  currentCardIndex: number;
  activeCategories: CardCategory[];
  activeDifficulty: (1 | 2 | 3 | 4 | 5)[];
  favorites: string[]; // Card IDs
  history: string[]; // Card IDs
  isLoading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  items: [],
  currentCardIndex: 0,
  activeCategories: [
    "icebreakers",
    "confessions",
    "personality",
    "deep-thoughts",
    "intimacy",
    "growth",
  ],
  activeDifficulty: [1, 2, 3, 4, 5],
  favorites: [],
  history: [],
  isLoading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // Card Navigation Actions
    nextCard: (state) => {
      state.currentCardIndex = Math.min(
        state.currentCardIndex + 1,
        state.items.length - 1
      );
    },
    likeCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      if (!state.history.includes(cardId)) {
        state.history.push(cardId);
      }
      // Weitere Logik...
    },
    skipCard: (state, action: PayloadAction<string>) => {
      // Logik für Skip...
    },
    // Category Filter Actions
    toggleCategory: (state, action: PayloadAction<CardCategory>) => {
      const category = action.payload;
      if (state.activeCategories.includes(category)) {
        state.activeCategories = state.activeCategories.filter(
          (c) => c !== category
        );
      } else {
        state.activeCategories.push(category);
      }
    },
    // Difficulty Filter Actions
    toggleDifficulty: (state, action: PayloadAction<1 | 2 | 3 | 4 | 5>) => {
      // Logik für Difficulty Toggles...
    },
    // Weitere Actions...
  },
});

// Selectors
export const selectFilteredCards = (state: RootState) => {
  const { items, activeCategories, activeDifficulty } = state.cards;
  return items.filter(
    (card) =>
      activeCategories.includes(card.category) &&
      activeDifficulty.includes(card.difficulty)
  );
};

export const {
  nextCard,
  likeCard,
  skipCard,
  toggleCategory,
  toggleDifficulty,
} = cardsSlice.actions;
export default cardsSlice.reducer;
```

### React Query

- Für API-Integrationen, falls nötig
- Cache-Management und Invalidierung

### Local State

- useState für isolierte Component-States
- useReducer für komplexeren lokalen State

### Persistence

- AsyncStorage für Offline-Persistenz
- Redux Persist für automatische Store-Persistenz

```typescript
// store.ts Muster mit Persistenz
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cards", "settings"], // Nur diese Reducer persistieren
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Für Redux Persist
      },
    }),
});

export const persistor = persistStore(store);
```

## Animation & Gesture Patterns 🎬

### Reanimated & Gesture Handler

- Reanimated 2 für performante UI-Animationen
- Gesture Handler für Touch-Interaktionen
- Worklets für JS Thread Unabhängigkeit

#### Card Swipe Pattern

```typescript
// Beispiel für CardDeck mit Swipe-Funktionalität
import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { ConversationCard } from "../components/ConversationCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

type CardDeckProps = {
  cards: ConversationCard[];
  onSwipeRight: (cardId: string) => void;
  onSwipeLeft: (cardId: string) => void;
};

export const CardDeck = ({
  cards,
  onSwipeRight,
  onSwipeLeft,
}: CardDeckProps) => {
  const currentCard = cards[0];
  const translateX = useSharedValue(0);
  const rotate = useSharedValue("0deg");

  // Gesture Handler Logic
  const panGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        translateX.value = event.translationX;
        // Rotate based on swipe
        rotate.value = `${(event.translationX / SCREEN_WIDTH) * 20}deg`;
      },
      onEnd: (event) => {
        if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
          // Swipe completed
          translateX.value = withSpring(
            event.translationX > 0 ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5,
            {},
            () => {
              if (event.translationX > 0) {
                runOnJS(onSwipeRight)(currentCard.id);
              } else {
                runOnJS(onSwipeLeft)(currentCard.id);
              }
            }
          );
        } else {
          // Return to center
          translateX.value = withSpring(0);
          rotate.value = withSpring("0deg");
        }
      },
    });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { rotate: rotate.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[styles.cardContainer, cardStyle]}>
        <ConversationCard card={currentCard} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 1.2,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
```

### Animation Prinzipien

- Flüssigkeit und Reaktionsgeschwindigkeit priorisieren
- Visuelle Rückmeldung auf Benutzerinteraktionen
- Natürliche Bewegung mit Spring-Animationen
- Leistung durch Worklets und JS-Thread-Unabhängigkeit
- Animation auf der UI-Thread für Smoothness

### Gesture Patterns

- Pinch für Zoom
- Pan für Drag & Swipe
- Tap für Selection
- Double Tap für spezielle Aktionen
- Long Press für Kontextmenüs

## API & Data Access 📡

### API Integration

- Axios für HTTP-Anfragen
- Interceptors für Authentication
- Service-Layer für API-Zugriff

### Data-Modeling

- Typisierte Interfaces für alle Datenmodelle
- Normalisierte Daten für Redux
- Immutable Data Patterns

## Navigation 🧭

### React Navigation

- Stack Navigator für Cards & Settings
- Tab Navigator für Bottom Tabs
- Typed Navigation mit TypeScript

### Screen-Hierarchie

```
AppNavigator
├── BottomTabNavigator
│   ├── CardStack          # Conversation Cards Flow
│   │   ├── CardList
│   │   ├── CardDetail
│   │   ├── CardCreate
│   │   └── CardEdit
│   └── SettingsStack      # Settings Flow
│       ├── SettingsHome
│       ├── ThemeSettings
│       ├── NotificationSettings
│       └── About
└── AuthStack              # Auth Flow (falls nötig)
    ├── Login
    └── Register
```

## Theming 🎨

### Theme System

- Context API für Theme-Provider
- Typed Theme-Definitionen
- Dark/Light Mode Support

### Colors & Styles

- Consistent Color Palette definiert in Theme
- Consistent Spacing System
- Typography Scale für konsistente Textgrößen

## Form Handling 📋

- Formik oder React Hook Form
- Yup für Schema-Validierung
- Controlled Components

## Error Handling ⚠️

- Try/Catch für async/await
- Error Boundaries für React Components
- Toast-Nachrichten für User Feedback
- Error Tracking wenn möglich

## Best Practices 🌟

- Pure Components für bessere Performance
- Memoization für teure Berechnungen
- Code-Splitting wo sinnvoll
- Lazy Loading für bessere Startup-Performance
- Typesafety durch TypeScript
