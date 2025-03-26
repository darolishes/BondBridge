# Aktiver Kontext

Version: 2.0.0
Letzte Aktualisierung: 2025-03-30 10:00:00
Status: 🟢 Aktiv

## Aktueller Fokus 🎯

Implementierung des MVP für Conversation Cards mit folgenden Kernfunktionen:

- Einfache Kartenansicht mit Swipe-Funktion
- Grundlegende Kategoriefilterung
- Automatische Integration externer Kartensets
- Einheitliches, modulares Theme-System ✅

## User Story Tracking 📋

Detaillierte User Stories sind im `.ai/stories/` Verzeichnis verfügbar:

| Feature                  | Status            | Epic/Story Referenz                                |
| ------------------------ | ----------------- | -------------------------------------------------- |
| Kartenansicht            | 🟡 In Entwicklung | [Epic-2 Story-1](../.ai/stories/epic-2/story-1.md) |
| Karten-Navigation        | 🟡 In Entwicklung | [Epic-2 Story-2](../.ai/stories/epic-2/story-2.md) |
| Kategoriefilter          | 🟡 In Entwicklung | [Epic-2 Story-3](../.ai/stories/epic-2/story-3.md) |
| Kartenset-Integration    | 📋 Geplant        | [Epic-4 Story-1](../.ai/stories/epic-4/story-1.md) |
| Onboarding-Erfahrung     | 📋 Geplant        | [Epic-1 Story-1](../.ai/stories/epic-1/story-1.md) |
| Favoriten-Funktionalität | 📋 Geplant        | [Epic-3 Story-2](../.ai/stories/epic-3/story-2.md) |

## Offene Fragen ❓

1. **State Management**

   - ✅ Effiziente Struktur für Kartenverwaltung
   - ✅ Grundlegende Filter-Operationen

2. **Kartenansicht**

   - Einfache, funktionale Swipe-Mechanik
   - Balance zwischen Funktionalität und UI-Komplexität

3. **Externes Kartenset-Management**
   - Benutzerfreundliche Integration von JSON-Dateien
   - Optimaler Speicherort für Kartensets

## Implementierungsstatus 📊

### Abgeschlossen ✅

- Projekt-Infrastruktur
- Grundlegende Ordnerstruktur
- Basis-Navigation
- Refaktoriertes Theme-System
  - Modulare Organisation in logische Unterverzeichnisse
  - Verbesserte Typendefinitionen
  - Zentralisierte Theme-Hooks
  - Vereinfachter ThemeProvider
- Einfache Card-Komponente
  - Modulare Unterteilung in CategoryBadge, QuestionText, DifficultyIndicator und FollowUpQuestions
  - Accessibility-Unterstützung
  - Performance-Optimierung mit React.memo
- State Management
  - Redux Store mit Slices (Cards, Filters, Settings)
  - Persistenz mit AsyncStorage
  - Typed Custom Hooks für Komponenten
  - Filter-Funktionalität

### In Bearbeitung 🔄

#### MVP-Komponenten

- Grundlegende Swipe-Funktion (15%)
- Kartennavigation (80%)

### Nächste Schritte 📋

1. Einfache Swipe-Funktionalität implementieren
2. Integration externer Kartensets (Basisfunktion)
3. Unit-Tests für Card-Komponenten erstellen

## Risiken ⚠️

- Überkomplexität durch zu viele Features in der ersten Version
- Verzögerungen durch Fokus auf nicht-essenzielle Funktionen

## Aktuelle Architektur & Systeme 📐

### Theme-System

- **Struktur**: Modular organisiert in Unterverzeichnisse:

  - `constants/`: Farben, Typografie, Spacing, Borders
  - `hooks.ts`: Theme-bezogene Hooks (useTheme, createThemedStyles, useNavigationTheme)
  - `types.ts`: Zentrale Typendefinitionen
  - `themes.ts`: Theme-Definitionen (Standard, Dunkel)
  - `ThemeProvider.tsx`: Context-Provider für Theme-Verwaltung
  - `index.ts`: Klare Export-Schnittstelle

- **Imports**: Alle Komponenten importieren Theme-Hooks aus "@theme/hooks"

- **Vorteile**: Klare Verantwortlichkeiten, Single Source of Truth, Typensicherheit, einfache Erweiterbarkeit

### Card-Komponenten-System

- **Struktur**: Modular aufgeteilt in Unterkomponenten:

  - `Card.tsx`: Hauptkomponente, die alle Unterkomponenten integriert
  - `CategoryBadge.tsx`: Anzeige der Kartenkategorie mit passender Farbkodierung
  - `QuestionText.tsx`: Hauptfrage mit richtiger Typografie
  - `DifficultyIndicator.tsx`: Anzeige des Schwierigkeitsgrades (1-5 Sterne)
  - `FollowUpQuestions.tsx`: Optionale Folgefragen mit Aufzählungszeichen

- **Integration**: CardScreen demonstriert die Verwendung des Card-Systems

### State Management System

- **Struktur**: Redux Toolkit mit modularen Slices:

  - `store/`: Zentrales Store-Verzeichnis
  - `slices/`: Redux Slices (Cards, Filters, Settings)
  - `hooks.ts`: Typed Custom Hooks für Redux
  - `providers/`: Redux Provider-Komponenten

- **Persistenz**: Redux Persist mit AsyncStorage

- **Features**:
  - Effiziente Verwaltung von Karten und Kartensets
  - Typsicherheit durch TypeScript
  - Optimierte Selektoren für Performance
  - Custom Hooks für einfache Komponenten-Integration
  - Filter-Funktionalität für Kategorien und Suchbegriffe
