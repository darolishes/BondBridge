# System Patterns

Version: 1.2.0
Last Updated: 2025-03-26 11:15:30
Status: 🟢 Active
Related Files: productContext.md, decisionLog.md, technical-debt.md

## Naming Conventions 📝

### Components

- ✅ PascalCase für Komponenten und Dateien (z.B. `CardItem`, `CategorySelector`)
- ✅ Props-Interfaces: `ComponentNameProps` (z.B. `CardItemProps`)
- ✅ Descriptive Names: Spezifisch und aussagekräftig (z.B. `ProgressIndicator` statt `Progress`)
- ✅ Component-Index-Dateien für saubere Imports

### Files

- ✅ PascalCase für Komponenten-Dateien (z.B. `CardItem.tsx`)
- ✅ camelCase für Utility-Dateien (z.B. `formatData.ts`)
- ✅ kebab-case für Verzeichnisnamen (z.B. `card-management/`)
- ✅ Test-Dateien: `*.test.tsx` oder `*.spec.tsx`
- ✅ Typen: `index.ts` in einem `types`-Verzeichnis

### Functions

- ✅ camelCase für Funktionsnamen (z.B. `handleSwipe`)
- ✅ Event-Handler: `handle*`-Präfix (z.B. `handleSwipe`)
- ✅ Custom Hooks: `use*`-Präfix (z.B. `useCardSwipe`)
- ✅ Async-Funktionen mit Promise-Return-Type-Annotation

## Project Structure 📁

```
/src
├── features/                # Feature-basierte Organisation
│   ├── card-management/     # Karten-Feature
│   │   ├── components/      # Kartenspezifische Komponenten
│   │   ├── screens/         # Kartenbildschirme
│   │   ├── hooks/           # Kartenspezifische Hooks
│   │   ├── types/           # Kartentypendefinitionen
│   │   ├── utils/           # Kartennutzfunktionen
│   │   ├── data/            # Kartendaten
│   │   └── index.ts         # Feature-Exporte
│   ├── data-import-export/  # Import/Export-Feature
│   │   ├── components/      # Import/Export-Komponenten
│   │   ├── screens/         # Import/Export-Bildschirme
│   │   ├── hooks/           # Import/Export-Hooks
│   │   ├── types/           # Import/Export-Typendefinitionen
│   │   └── index.ts         # Feature-Exporte
│   └── settings/            # Einstellungen-Feature (geplant)
├── common/                  # Gemeinsam genutzte Ressourcen
│   ├── components/          # Gemeinsame UI-Komponenten
│   ├── hooks/               # Gemeinsame Hooks
│   ├── utils/               # Gemeinsame Hilfsfunktionen
│   ├── types/               # Gemeinsame Typendefinitionen
│   └── index.ts             # Common-Exporte
├── navigation/              # Navigationskonfiguration
├── store/                   # Redux-Store-Setup
│   ├── slices/              # Redux-Slices
│   ├── middleware/          # Benutzerdefinierte Middleware
│   └── hooks.ts             # Typisierte Hooks für Store-Zugriff
├── theme/                   # Themenkonfiguration
│   ├── index.ts             # Theme-Exporte
│   ├── lightTheme.ts        # Helle Theme-Definition
│   └── darkTheme.ts         # Dunkle Theme-Definition
└── app.tsx                  # Haupt-App-Komponente
```

## Feature-Based Architecture 🏗️

### Feature-Module-Struktur

- ✅ Selbstständige Features mit minimalen Abhängigkeiten
- ✅ Klare öffentliche API über index.ts
- ✅ Interne Implementierungsdetails versteckt
- ✅ Typen pro Feature definiert und exportiert

### Import-Muster

- ✅ Feature-Level-Imports (z.B. `import { CardItem } from '@features/card-management'`)
- ✅ Pfadaliase für saubere Imports
- ✅ Vermeidung tiefer relativer Pfade

## Coding Standards 📚

### TypeScript

- ✅ Strict Mode aktiviert
- ✅ Explizite Rückgabetypen für Funktionen
- ✅ Einheitliche Typdefinitionen in `types`-Verzeichnissen
- ✅ Korrekte Fehlerbehandlung mit typisierten Fehlern
- ✅ Zod für Laufzeit-Typvalidierung

### React-Muster

- ✅ Funktionale Komponenten mit Hooks
- ✅ Benutzerdefinierte Hooks für gemeinsame Logik
- ✅ Memoization mit useMemo und useCallback
- ✅ Komponentenkomposition statt Vererbung
- ✅ Vermeidung von Inline-Styling zugunsten von Theme-System

### Testing

- ✅ Jest + React Testing Library
- ✅ Komponentententests erforderlich
- ✅ Minimum 80% Abdeckung
- ✅ E2E mit Detox
- ✅ Benutzerdefinierte Testing-Hooks für häufige Muster

### Code-Qualität

- ✅ ESLint + Prettier
- ✅ Husky Pre-Commit-Hooks
- ✅ SonarQube-Integration (geplant)
- ✅ Regelmäßige Dependency-Updates
- ✅ Import-Sortierung mit eslint-plugin-import

## State Management Patterns 🔄

- ✅ Redux Toolkit für globalen Zustand

  - Slices für Feature-basierten Zustand
  - RTK Query für API-Caching (Zukunft)
  - Selektive Zustandspersistenz

- ✅ React Query für Remote-Daten

  - Cached Responses
  - Optimistische Updates
  - Automatische Wiederholungen

- ✅ Lokaler Zustand

  - useState für einfachen UI-Zustand
  - useReducer für komplexen Komponentenzustand

- ✅ Persistenzstrategie
  - Redux-persist für globalen Zustand
  - AsyncStorage für App-Einstellungen
  - Migrationsstrategien für Datenschemaänderungen

## Animation and Gesture Patterns 🎭

- ✅ React Native Reanimated für Performance

  - Worklets für UI-Thread-Animationen
  - Shared Values für Animationszustand

- ✅ Gesture Handler für Interaktionen

  - Pan-Handler für Swipe
  - Tap-Handler für Press
  - Komposition für komplexe Gesten

- ✅ Layout Animation für einfache Übergänge
  - Automatische Layout-Animationen
  - Koordinierte Übergänge
