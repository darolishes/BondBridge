# Aktiver Kontext

Version: 2.0.0
Letzte Aktualisierung: 2025-03-28 12:00:00
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

   - Effiziente Struktur für Kartenverwaltung
   - Grundlegende Filter-Operationen

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

### In Bearbeitung 🔄

#### MVP-Komponenten

- Einfache Card-Komponente (50%)
- Grundlegende Swipe-Funktion (15%)
- Basis State Management (45%)

### Nächste Schritte 📋

1. Fertigstellung der Card-Komponente (funktional ohne komplexe Animationen)
2. Einfache Swipe-Funktionalität
3. Grundlegende State-Verwaltung
4. Integration externer Kartensets (Basisfunktion)

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
