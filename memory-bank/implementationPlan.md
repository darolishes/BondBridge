## State Management Erweiterung - Umsetzungsplan

### 1. Provider-Restrukturierung

- Umbenennung `FilterProvider` → `CardStateProvider`
- Neue Zustandsvariablen:
  - `currentCardSet: CardSetType`
  - `swipeHistory: SwipeAction[]`
  - `loadedCardSets: CardSetMeta[]`

### 2. Erweiterte Filtertypen

- Hinzufügen von:
  - `difficultyRange: [number, number]`
  - `cardStatus: 'unseen' | 'swiped' | 'reported'`
  - `cardSetFilters: string[]`

### 3. Persistenzschicht

- AsyncStorage Keys:
  - `cardSets` → Geladene Sets
  - `swipeHistory` → Nutzeraktionen
  - `cardState` → Kombinierter Zustand

### 4. Migrationsstrategie

- Schrittweise Migration vom alten FilterSystem
- Kompatibilitätslayer für bestehende Komponenten

# Implementierungsplan: Conversation Cards (MVP)

Version: 2.0.0
Letzte Aktualisierung: 2025-03-27 15:00:00
Status: 🟢 Aktiv

## Überblick 🔍

BondBridge App - MVP mit fokussierten Kernfeatures:

- Einfache Kartenansicht mit grundlegender Swipe-Funktion
- Minimales State Management für Karten und Filter
- Benutzerfreundliche Integration externer Kartensets

## Phasenplan 📅

| Phase | Bereich              | Zeitraum       | Kernkomponenten                           |
| ----- | -------------------- | -------------- | ----------------------------------------- |
| 1     | Datenmodell          | Sprint 2, W1   | Einfaches Schema, Mock-Daten              |
| 2     | UI-Komponenten       | Sprint 2, W2   | Card-Komponente, CardDeck (Basisfunktion) |
| 3     | Einfache Interaktion | Sprint 2, W3   | Grundlegende Swipe-Funktion               |
| 4     | Kategoriefilter      | Sprint 3, W1   | Einfache Filteroptionen                   |
| 5     | Externe Kartensets   | Sprint 3, W1-2 | Einfacher Import-Mechanismus, Validierung |

## Kernkonzepte 🧩

### 1. Einfaches Datenmodell

```typescript
// Vereinfachtes Kartenmodell
type ConversationCard = {
  id: string;
  question: string;
  followUpQuestions?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  category:
    | "icebreakers"
    | "confessions"
    | "personality"
    | "deep-thoughts"
    | "intimacy"
    | "growth";
};
```

### 2. Minimales State Management

```typescript
// Grundlegende State-Struktur
const initialState = {
  cards: [], // Array von Karten
  currentCardIndex: 0,
  activeCategories: ["icebreakers", "confessions"], // Standardfilter
  activeDifficulty: [1, 2, 3], // Standardfilter
};
```

### 3. Einfache UI-Komponenten

```typescript
// Einfache Card-Komponente
interface CardProps {
  card: ConversationCard;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}
```

### 4. Externe Kartensets

```typescript
// Grundlegende Struktur für externe Sets
type ExternalCardSet = {
  id: string;
  name: string;
  description: string;
  cards: ConversationCard[];
};
```

## Implementierungspriorität ⚡

1. **Einfache Kartenansicht** - Grundlegende Darstellung der Fragen
2. **Grundlegende Swipe-Funktion** - Minimal funktional, ohne komplexe Animation
3. **Einfache Filterung** - Basis-Kategoriefilter
4. **Externe Kartenintegration** - Grundlegender Import-Mechanismus

## Zukünftige Erweiterungen (Post-MVP) 🔮

- **Favoriten-System** - Für spätere Implementierung
- **Dark Mode** - Für spätere Implementierung
- **Komplexe Animationen** - Nach MVP-Release
- **Erweitertes Filtermanagement** - Nach grundlegender Funktionalität
- **Redux Toolkit mit Entity Adapter** - Für größere Datenmengen

## Erfolgsmetriken MVP ✅

- **Funktionalität**: Grundlegende Kartenansicht und Swipe-Funktion
- **Benutzerfreundlichkeit**: Einfache, intuitive Bedienung
- **Minimalität**: Fokus auf Kernfunktionen, ohne Überfrachtung
