# Implementation Plan: Swipeable Conversation Cards

Version: 1.1.0
Last Updated: 2025-03-26 15:48:00
Status: 🟢 Active

## Überblick 📋

Dieses Dokument beschreibt den Implementierungsplan für das Swipeable Conversation Cards Feature der BondBridge App. Es definiert die Komponenten, Datenmodelle, State Management und Animation Patterns, die für dieses Feature benötigt werden. Zusätzlich beschreibt es die automatische Integration externer Kartensets ohne UI-basierte Import/Export-Funktionalität.

## Zeitplan 📅

- **Phase 1**: Datenmodell & Redux State (Sprint 2, Woche 1-2)
- **Phase 2**: UI-Komponenten (Sprint 2, Woche 2-3)
- **Phase 3**: Swipe-Animation & Gestures (Sprint 3, Woche 1)
- **Phase 4**: Filter & Kategorien (Sprint 3, Woche 1-2)
- **Phase 5**: Persistenz & Offline-Funktionalität (Sprint 3, Woche 2)
- **Phase 6**: Automatisches Laden externer Kartensets (Sprint 3, Woche 2-3)

## 1. Datenmodell 📊

### Card Interface

```typescript
// features/conversation-cards/types.ts
export interface ConversationCard {
  id: string;
  question: string; // Hauptfrage
  followUpQuestions?: string[]; // Optionale Nachfragen
  difficulty: 1 | 2 | 3 | 4 | 5; // Schwierigkeitsgrad
  category: CardCategory; // Kategorie
  createdAt: string;
  updatedAt: string;
  seen?: boolean; // Wurde die Karte bereits gesehen?
  favorite?: boolean; // Ist die Karte favorisiert?
}

export type CardCategory =
  | "icebreakers"
  | "confessions"
  | "personality"
  | "deep-thoughts"
  | "intimacy"
  | "growth";

// Schema für externe Kartensets
export interface ExternalCardSet {
  id: string; // Eindeutige ID des Sets
  name: string; // Name des Kartensets
  description: string; // Beschreibung des Sets
  version: string; // Version (semver)
  cards: ConversationCard[]; // Enthaltene Karten
}
```

### Mock Data

- Erstelle einen initialen Kartensatz mit mindestens 5 Karten pro Kategorie
- Speichere diese in `features/conversation-cards/data/mockCards.ts`

## 2. Redux State Management 🧠

### Cards Slice

```typescript
// features/conversation-cards/cards.slice.ts
interface CardsState {
  items: ConversationCard[];
  cardSets: {
    [id: string]: {
      id: string;
      name: string;
      description: string;
      version: string;
      isActive: boolean;
    };
  };
  currentCardIndex: number;
  activeCategories: CardCategory[];
  activeDifficulty: (1 | 2 | 3 | 4 | 5)[];
  favorites: string[]; // Card IDs
  history: string[]; // Card IDs
  isLoading: boolean;
  error: string | null;
}
```

### Key Actions

- `fetchCards`: Lade Karten (zunächst Mock-Daten)
- `loadExternalCardSets`: Lade externe Kartensets aus dem Dateisystem
- `addCardSet`: Füge ein neues Kartenset hinzu
- `toggleCardSetActive`: Aktiviere/Deaktiviere ein Kartenset
- `likeCard`: Markiere Karte als gemocht und zur History hinzufügen
- `skipCard`: Überspringe Karte und zur History hinzufügen
- `toggleFavorite`: Karte als Favorit markieren/demarkieren
- `toggleCategory`: Kategorie-Filter ein-/ausschalten
- `toggleDifficulty`: Schwierigkeitsgrad-Filter ein-/ausschalten
- `resetCards`: Zurücksetzen der gesehenen Karten

### Selectors

- `selectFilteredCards`: Gibt Karten basierend auf aktiven Filtern zurück
- `selectCurrentCard`: Gibt aktuelle Karte basierend auf Index zurück
- `selectActiveCategories`: Gibt aktive Kategorien zurück
- `selectActiveDifficulty`: Gibt aktive Schwierigkeitsgrade zurück
- `selectFavorites`: Gibt favorisierte Karten zurück
- `selectCardSets`: Gibt alle verfügbaren Kartensets zurück

## 3. UI Komponenten 🎨

### ConversationCard

```typescript
// features/conversation-cards/components/ConversationCard.tsx
type ConversationCardProps = {
  card: ConversationCard;
  onFavorite?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};
```

- Zeigt Hauptfrage an
- Zeigt Kategorie visuell an (Farbe, Icon)
- Zeigt Schwierigkeitsgrad an (1-5 Punkte/Sterne)
- Zeigt Follow-Up-Fragen an (optional expandierbar)
- Favorite-Button

### CardDeck

```typescript
// features/conversation-cards/components/CardDeck.tsx
type CardDeckProps = {
  cards: ConversationCard[];
  onSwipeRight: (cardId: string) => void;
  onSwipeLeft: (cardId: string) => void;
  onSwipeEnd?: () => void;
};
```

- Verwaltet Kartenstapel
- Implementiert Swipe-Gesten
- Zeigt aktuelle und nächste Karte
- Animiert Übergänge mit Reanimated

### CategoryFilter

```typescript
// features/conversation-cards/components/CategoryFilter.tsx
type CategoryFilterProps = {
  categories: CardCategory[];
  activeCategories: CardCategory[];
  onToggle: (category: CardCategory) => void;
};
```

- Chip-basierte Filter-UI
- Visuelles Feedback für aktive Filter
- Horizontale ScrollView für alle Kategorien

### DifficultySelector

```typescript
// features/conversation-cards/components/DifficultySelector.tsx
type DifficultySelectorProps = {
  activeDifficulty: (1 | 2 | 3 | 4 | 5)[];
  onToggle: (difficulty: 1 | 2 | 3 | 4 | 5) => void;
};
```

- Numerische oder Icon-basierte Auswahl
- Multiselect-Funktionalität
- Visuelles Feedback für aktive Auswahl

## 4. Screens 📱

### CardsScreen

```typescript
// features/conversation-cards/screens/CardsScreen.tsx
```

- Hauptbildschirm für Karten-Interaktion
- Enthält CardDeck
- Enthält Filter (CategoryFilter, DifficultySelector)
- Verbindet UI-Events mit Redux-Actions

### FavoritesScreen

```typescript
// features/conversation-cards/screens/FavoritesScreen.tsx
```

- Zeigt favorisierte Karten an
- Ermöglicht Entfernen von Favoriten
- Sortierung nach Kategorie oder Datum

## 5. Animation & Gestures 🎬

### Swipe Animation

- Verwende `Animated` und `PanGestureHandler` aus Reanimated
- Implementiere horizontales Swipen mit Rotation
- Threshold für erfolgreichen Swipe
- Visuelles Feedback während Swipe
- "Spring-back" Animation für unvollständige Swipes
- Scale-Animation für nächste Karte

### Transition Animations

- Fade-in/Fade-out für Kategoriewechsel
- Smooth Transitions bei Filteränderungen

## 6. Persistenz 💾

### AsyncStorage Integration

- Redux Persist mit AsyncStorage
- Whitelist für kritische Daten (Favoriten, History)
- PersistGate für korrektes Laden

```typescript
// app/store.ts
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cards"], // Nur Cards persistieren
};
```

## 7. Automatische Kartenset-Integration 🔄

### CardSetLoader Service

```typescript
// features/conversation-cards/services/cardsets/CardSetLoader.ts
import * as FileSystem from "react-native-fs";
import { ExternalCardSet } from "../../types";

class CardSetLoader {
  private cardSetsDir: string;

  constructor() {
    this.cardSetsDir = `${FileSystem.DocumentDirectoryPath}/cardsets`;
    this.ensureCardSetsDirectory();
  }

  private async ensureCardSetsDirectory(): Promise<void> {
    const exists = await FileSystem.exists(this.cardSetsDir);
    if (!exists) {
      await FileSystem.mkdir(this.cardSetsDir);
    }
  }

  async loadCardSets(): Promise<ExternalCardSet[]> {
    try {
      await this.ensureCardSetsDirectory();

      const files = await FileSystem.readdir(this.cardSetsDir);
      const jsonFiles = files.filter((file) => file.endsWith(".json"));

      const cardSets: ExternalCardSet[] = [];

      for (const file of jsonFiles) {
        try {
          const content = await FileSystem.readFile(
            `${this.cardSetsDir}/${file}`,
            "utf8"
          );
          const cardSet = JSON.parse(content);

          if (this.validateCardSet(cardSet)) {
            cardSets.push(cardSet);
          } else {
            console.warn(`Invalid card set format in ${file}`);
          }
        } catch (error) {
          console.error(`Error loading card set from ${file}:`, error);
        }
      }

      return cardSets;
    } catch (error) {
      console.error("Error loading card sets:", error);
      return [];
    }
  }

  private validateCardSet(cardSet: any): cardSet is ExternalCardSet {
    // Grundlegende Validierung
    if (!cardSet || typeof cardSet !== "object") return false;
    if (
      !cardSet.id ||
      !cardSet.name ||
      !cardSet.version ||
      !Array.isArray(cardSet.cards)
    )
      return false;

    // Karten-Validierung
    for (const card of cardSet.cards) {
      if (!this.validateCard(card)) return false;
    }

    return true;
  }

  private validateCard(card: any): boolean {
    if (!card || typeof card !== "object") return false;
    if (!card.id || !card.question || !card.category || !card.difficulty)
      return false;

    // Kategorie-Validierung
    const validCategories = [
      "icebreakers",
      "confessions",
      "personality",
      "deep-thoughts",
      "intimacy",
      "growth",
    ];
    if (!validCategories.includes(card.category)) return false;

    // Schwierigkeitsgrad-Validierung
    if (![1, 2, 3, 4, 5].includes(card.difficulty)) return false;

    return true;
  }

  getCardSetsPath(): string {
    return this.cardSetsDir;
  }
}

export default new CardSetLoader();
```

### Integration in Redux

```typescript
// features/conversation-cards/cards.slice.ts (Action)
export const loadExternalCardSets = createAsyncThunk(
  "cards/loadExternalCardSets",
  async (_, { rejectWithValue }) => {
    try {
      const cardSets = await CardSetLoader.loadCardSets();
      return cardSets;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Im Reducer
builder.addCase(loadExternalCardSets.fulfilled, (state, action) => {
  const newCardSets = action.payload;

  // Neue Kartensets hinzufügen
  for (const set of newCardSets) {
    state.cardSets[set.id] = {
      id: set.id,
      name: set.name,
      description: set.description,
      version: set.version,
      isActive: true,
    };

    // Karten zum Gesamtbestand hinzufügen
    for (const card of set.cards) {
      // Prüfen, ob die Karte bereits existiert
      const existingIndex = state.items.findIndex((c) => c.id === card.id);
      if (existingIndex >= 0) {
        // Aktualisieren, falls Version neuer
        state.items[existingIndex] = card;
      } else {
        // Neue Karte hinzufügen
        state.items.push(card);
      }
    }
  }

  state.isLoading = false;
});
```

### Automatisches Laden beim Start

```typescript
// features/conversation-cards/screens/CardsScreen.tsx
useEffect(() => {
  dispatch(loadExternalCardSets());
}, [dispatch]);

// Alternativ in App.tsx für globale Verfügbarkeit
```

### Regelmäßige Überprüfung auf neue Sets

```typescript
// features/conversation-cards/hooks/useCardSetSync.ts
export const useCardSetSync = (intervalInMinutes = 60) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial laden
    dispatch(loadExternalCardSets());

    // Regelmäßiges Überprüfen
    const interval = setInterval(() => {
      dispatch(loadExternalCardSets());
    }, intervalInMinutes * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, intervalInMinutes]);
};
```

## 8. Navigation Integration 🧭

### CardStack Updates

- Route für `CardsScreen` als Haupteinstiegspunkt
- Route für `FavoritesScreen`
- Optionen für Tab-Integration
- Korrekte Header-Konfiguration

## 9. Implementierungsreihenfolge 📑

1. **Datenmodell & Redux Setup**

   - Typen definieren
   - Redux Slice implementieren
   - Mock-Daten erstellen

2. **Basis-UI-Komponenten**

   - ConversationCard implementieren
   - Basis CardDeck ohne Animation

3. **Swipe & Animation**

   - Reanimated & Gesture Handler integrieren
   - Swipe-Logik implementieren
   - Animationen hinzufügen

4. **Filter-Komponenten**

   - CategoryFilter implementieren
   - DifficultySelector implementieren
   - Mit Redux verbinden

5. **Screens & Navigation**

   - CardsScreen implementieren
   - FavoritesScreen implementieren
   - In Navigation integrieren

6. **Persistenz & Offline**

   - Redux Persist einrichten
   - Offline-State-Management testen

7. **Polishing & Optimierung**
   - Performance-Optimierung
   - UI-Verfeinerung
   - Accessibility

## 10. Abhängigkeiten 🔄

- React Native Reanimated 2+
- React Native Gesture Handler
- Redux Toolkit
- Redux Persist
- AsyncStorage
- React Navigation

## 11. Risiken & Mitigationen ⚠️

| Risiko                             | Wahrscheinlichkeit | Auswirkung | Mitigation                                      |
| ---------------------------------- | ------------------ | ---------- | ----------------------------------------------- |
| Performance-Probleme bei Animation | Mittel             | Hoch       | Worklets verwenden, UI-Thread-Optimierung       |
| Komplexe Redux-State-Updates       | Mittel             | Mittel     | Selektoren verwenden, Immutability wahren       |
| Dateisystem-Berechtigungen         | Hoch               | Hoch       | Fallback-Mechanismen, klare Fehlermeldungen     |
| Korrupte externe Kartensets        | Mittel             | Hoch       | Robuste Validierung, isolierte Fehlerbehandlung |
| Inkonsistenzen bei Persistierung   | Niedrig            | Hoch       | Migrations-Strategie, Daten-Validierung         |
| Gestenkonflikt mit Navigation      | Mittel             | Mittel     | Gesture Handler richtig konfigurieren           |

## 12. Definition of Done ✅

- Alle UI-Komponenten implementiert und getestet
- Vollständige Swipe-Funktionalität mit Animationen
- Filter nach Kategorie und Schwierigkeitsgrad funktionieren
- Favoriten-Markierung und -Anzeige funktionieren
- Persistenz über App-Neustarts hinweg
- Vollständige Offline-Funktionalität
- Automatisches Laden von externen Kartensets
- Validierung von Kartensets mit klaren Fehlermeldungen
- Unit- und Integrationstests mit >80% Coverage
