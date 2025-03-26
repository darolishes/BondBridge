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

## UI Component Patterns

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
