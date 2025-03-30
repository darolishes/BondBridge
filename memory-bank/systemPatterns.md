# System Patterns & Conventions

Version: 2.0.0
Letzte Aktualisierung: 2025-03-27 15:00:00
Status: 🟢 Aktiv

## Kernkonzepte für MVP 🔍

- **Feature-basierte Architektur**: Komponenten nach Funktionalität gruppiert
- **Typsicherheit**: Grundlegende TypeScript-Typdefinitionen
- **State Management**: Einfache, funktionale Zustandsverwaltung
- **Offline-First**: Grundlegende lokale Datenspeicherung
- **Integration**: Einfache Einbindung externer Kartensets

## Gesture Handling Pattern

**Anwendung:**
The following packages should be updated for best compatibility with the installed expo version:
@react-native-async-storage/async-storage@2.1.2 - expected version: 1.23.1
expo@52.0.40 - expected version: ~52.0.41
react-native-gesture-handler@2.24.0 - expected version: ~2.20.2
react-native-reanimated@3.17.1 - expected version: ~3.16.1
react-native-safe-area-context@5.3.0 - expected version: 4.12.0
react-native-screens@4.9.2 - expected version: ~4.4.0
Your project may not work correctly until you install the expected versions of the packages.

- Alle interaktiven Gesten

**Implementierung:**

## Redux State Management Pattern

## Gesture Handling Architecture

**Components:**

1. SwipeHandler (Gesture logic)
2. Card (Presentation)
3. ErrorBoundary (Fault tolerance)

**Data Flow:**
Gesture → Animation → State Update → Redux

**Key Decisions:**

- Reanimated 3 for 60fps animations
- Separate gesture logic from presentation
- Custom error boundary for swipe operations
  **Anwendung:**

- Globaler App-Zustand
- Swipe-Historie
- Kartenstapel-Verwaltung

**Implementierung:**

1. RTK Query für API Calls
2. createAsyncThunk für async Actions
3. Normalized State Structure

**Sicherheitsmechanismen:**

- Auto-batch Actions
- Immutable Updates
- Transaction Middleware

1. react-native-gesture-handler für Basisgesten
2. Reanimated für performante Animationen
3. Zustandsisolation mittels Shared Values

**Vorteile:**

- 60 FPS Animationen
- Native Gestenerkennung
- Trennung von Logik und Darstellung

## UI Component Patterns

## Cross-Component State Flow

**Anwendung:**

- UI-Interaktionen mit globalen Effekten

**Implementierung:**

1. Lokaler UI-State in Shared Values
2. Globale Effekte über Redux Actions
3. Callback-Propagation über Komponentenhierarchie

**Vorteile:**

- Entkopplung von UI und Business-Logik
- Vorhersagbare State-Aktualisierungen

### Card Component Enhancements (2025-03-26)

- Material Design 3 elevation system implementation
- Dynamic contrast ratio calculations for accessibility
- Swipe animation feedback using react-native-reanimated
- Centralized shadow styling through theme constants
- PointerEvents handling strategy for touch interactions

## Namenskonventionen 📝

| Typ           | Konvention    | Beispiel               |
| ------------- | ------------- | ---------------------- |
| Komponenten   | PascalCase    | `ConversationCard.tsx` |
| Funktionen    | camelCase     | `handleSwipe()`        |
| Verzeichnisse | kebab-case    | `conversation-cards/`  |
| Event Handler | handle-Präfix | `handleSwipe`          |
| Zustände      | is/has-Präfix | `isLoading`            |

## Vereinfachte Projektstruktur 🏗️

```
src/
├── features/            # Feature-Module
│   ├── conversation-cards/
│   │   ├── components/  # Komponenten
│   │   ├── screens/     # Screens
│   │   └── services/    # Kartenset-Integration
├── navigation/          # Navigation
└── theme/               # Grundlegendes Styling
```

## Datenmodell 📊

> **Hinweis**: Das zentrale Datenmodell ist in `productContext.md` definiert und
> sollte nicht dupliziert werden, um Inkonsistenzen zu vermeiden.

## Einfaches State Management 🧠

```typescript
// Grundlegender Zustandsansatz für MVP
const [cards, setCards] = useState<ConversationCard[]>([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [activeCategories, setActiveCategories] = useState<CardCategory[]>([
  "icebreakers",
  "confessions",
]);

// Einfache Filter-Funktion
const filteredCards = cards.filter((card) =>
  activeCategories.includes(card.category)
);
```

## Einfache Animation & Gesten 🎬

- Grundlegende Swipe-Erkennung mit React Native's `PanResponder`
- Einfache Übergangsanimationen für Kartenwechsel
- Fokus auf Funktionalität statt komplexer visueller Effekte

## UI-Komponenten 🎨

### Grundlegende Komponenten für MVP

```typescript
// Einfache Card-Komponente
interface CardProps {
  card: ConversationCard;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

// Einfacher Filter
interface FilterProps {
  categories: CardCategory[];
  activeCategories: CardCategory[];
  onToggleCategory: (category: CardCategory) => void;
}
```

## Best Practices für MVP 🌟

- **Einfachheit**: Fokus auf Kernfunktionalität
- **Lesbarkeit**: Klarer, verständlicher Code
- **Modularität**: Logische Gruppierung verwandter Funktionen
- **Testbarkeit**: Einfache Struktur für bessere Testbarkeit
- **Erweiterbarkeit**: Grundlagen für spätere Erweiterungen legen

### Künftige Erweiterungen (Post-MVP)

Die folgenden fortgeschrittenen Muster können nach erfolgreicher MVP-Implementierung eingeführt werden:

- Redux Toolkit mit Entity Adapter
- Komplexere Animations-Patterns
- Erweiterte Validierungsmechanismen mit Zod
- Performance-Optimierungen
