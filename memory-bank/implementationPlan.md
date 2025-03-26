# Implementation Plan: Swipeable Conversation Cards

Version: 1.0.0
Last Updated: 2025-03-26 14:49:30
Status: 🟢 Active

## Überblick 📋

Dieses Dokument beschreibt den Implementierungsplan für das Swipeable Conversation Cards Feature der BondBridge App. Es definiert die Komponenten, Datenmodelle, State Management und Animation Patterns, die für dieses Feature benötigt werden.

## Zeitplan 📅

- **Phase 1**: Datenmodell & Redux State (Sprint 2, Woche 1-2)
- **Phase 2**: UI-Komponenten (Sprint 2, Woche 2-3)
- **Phase 3**: Swipe-Animation & Gestures (Sprint 3, Woche 1)
- **Phase 4**: Filter & Kategorien (Sprint 3, Woche 1-2)
- **Phase 5**: Persistenz & Offline-Funktionalität (Sprint 3, Woche 2)

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
```

### Mock Data

- Erstelle einen initialien Kartensatz mit mindestens 5 Karten pro Kategorie
- Speichere diese in `features/conversation-cards/data/mockCards.ts`

## 2. Redux State Management 🧠

### Cards Slice

```typescript
// features/conversation-cards/cards.slice.ts
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
```

### Key Actions

- `fetchCards`: Lade Karten (zunächst Mock-Daten)
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

## 7. Navigation Integration 🧭

### CardStack Updates

- Route für `CardsScreen` als Haupteinstiegspunkt
- Route für `FavoritesScreen`
- Optionen für Tab-Integration
- Korrekte Header-Konfiguration

## 8. Implementierungsreihenfolge 📑

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

## 9. Abhängigkeiten 🔄

- React Native Reanimated 2+
- React Native Gesture Handler
- Redux Toolkit
- Redux Persist
- AsyncStorage
- React Navigation

## 10. Risiken & Mitigationen ⚠️

| Risiko                             | Wahrscheinlichkeit | Auswirkung | Mitigation                                |
| ---------------------------------- | ------------------ | ---------- | ----------------------------------------- |
| Performance-Probleme bei Animation | Mittel             | Hoch       | Worklets verwenden, UI-Thread-Optimierung |
| Komplexe Redux-State-Updates       | Mittel             | Mittel     | Selektoren verwenden, Immutability wahren |
| Inkonsistenzen bei Persistierung   | Niedrig            | Hoch       | Migrations-Strategie, Daten-Validierung   |
| Gestenkonflikt mit Navigation      | Mittel             | Mittel     | Gesture Handler richtig konfigurieren     |

## 11. Definition of Done ✅

- Alle UI-Komponenten implementiert und getestet
- Vollständige Swipe-Funktionalität mit Animationen
- Filter nach Kategorie und Schwierigkeitsgrad funktionieren
- Favoriten-Markierung und -Anzeige funktionieren
- Persistenz über App-Neustarts hinweg
- Vollständige Offline-Funktionalität
- Unit- und Integrationstests mit >80% Coverage
