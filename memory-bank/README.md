# BondBridge Memory Bank

Version: 1.0.0
Last Updated: 2025-03-26 16:10:00
Status: 🟢 Active

## Überblick 📖

Dieses Verzeichnis enthält die Dokumentation und Planung für die BondBridge App, eine mobile Anwendung zur Förderung der Kommunikation zwischen Paaren durch swipeable Gesprächskarten mit Offline-Funktionalität und automatischer Integration externer Kartensets.

## Dateien 📑

- `activeContext.md` - Aktueller Fokus, Änderungen und offene Fragen
- `productContext.md` - Kernfeatures, Architektur und technische Anforderungen
- `implementationPlan.md` - Detaillierte Implementierungsschritte für Hauptfeatures
- `userStories.md` - Ausführliche User Stories mit Akzeptanzkriterien
- `systemPatterns.md` - Coding Standards, Namenskonventionen und Architekturmuster
- `decisionLog.md` - Technische Entscheidungen mit Begründungen
- `roadmap.md` - Entwicklungsphasen und zukünftige Features
- `progress.md` - Fortschrittsverfolgung der Entwicklung
- `uiPrinciples.md` - Design-Richtlinien und UI-Patterns

## Kern-Features ⭐

- Swipeable Karten in 6 Kategorien (Icebreakers, Confessions, Personality, Deep Thoughts, Intimacy, Growth)
- Verschiedene Schwierigkeitsgrade (1-5) für progressives Vertiefen der Kommunikation
- Hauptfragen mit optionalen Nachfragen für tiefere Gespräche
- Automatische Integration externer Kartensets ohne UI-basierte Import/Export-Funktionalität
- Vollständige Offline-Funktionalität
- Fortschrittsverfolgung und Favoriten-Markierung

## Technische Architektur 🏗️

Die App basiert auf folgenden Technologien:

- **Framework**: React Native mit Expo
- **State Management**: Redux Toolkit mit Redux Persist
- **Datenpersistenz**: AsyncStorage
- **Dateisystem-Zugriff**: react-native-fs
- **Animationen**: React Native Reanimated
- **Gesten**: React Native Gesture Handler
- **Navigation**: React Navigation
- **Typensicherheit**: TypeScript

## Automatische Kartenset-Integration 🔄

BondBridge verwendet einen innovativen Ansatz zur Erweiterung von Inhalten:

1. Die App erstellt ein spezielles Verzeichnis auf dem Gerät (`${DocumentDirectoryPath}/cardsets`)
2. Benutzer können dort JSON-Dateien mit neuen Kartensets platzieren
3. Die App scannt dieses Verzeichnis beim Start und in regelmäßigen Abständen
4. Neue oder aktualisierte Kartensets werden automatisch validiert und integriert
5. Die Validierung erfolgt gegen ein definiertes Schema, um die Datenintegrität zu gewährleisten

### Kartenset-Schema

```typescript
interface ExternalCardSet {
  id: string; // Eindeutige ID des Sets
  name: string; // Name des Kartensets
  description: string; // Beschreibung des Sets
  version: string; // Version (semver)
  cards: ConversationCard[]; // Enthaltene Karten
}

interface ConversationCard {
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

type CardCategory =
  | "icebreakers"
  | "confessions"
  | "personality"
  | "deep-thoughts"
  | "intimacy"
  | "growth";
```

## Erstellung eigener Kartensets für Benutzer 🧩

### Anleitung zum Erstellen eines eigenen Kartensets:

1. **Kartenset-Datei erstellen**:

   - Erstelle eine neue Textdatei mit der Endung `.json`
   - Verwende einen Texteditor deiner Wahl (Notepad, TextEdit, VS Code, etc.)

2. **Grundstruktur einfügen**:

   ```json
   {
     "id": "mein-eigenes-kartenset-001",
     "name": "Mein eigenes Kartenset",
     "description": "Eine Sammlung persönlicher Fragen",
     "version": "1.0.0",
     "cards": []
   }
   ```

3. **Karten hinzufügen**:

   ```json
   "cards": [
     {
       "id": "karte-001",
       "question": "Was war das schönste Kompliment, das du je bekommen hast?",
       "followUpQuestions": [
         "Wer hat es dir gegeben?",
         "Wie hat es dich fühlen lassen?"
       ],
       "difficulty": 2,
       "category": "icebreakers",
       "createdAt": "2025-03-26T12:00:00Z",
       "updatedAt": "2025-03-26T12:00:00Z"
     },
     {
       "id": "karte-002",
       "question": "Welche drei Werte sind dir im Leben am wichtigsten?",
       "followUpQuestions": [
         "Wie lebst du diese Werte im Alltag?",
         "Woher kommen diese Werte?"
       ],
       "difficulty": 4,
       "category": "deep-thoughts",
       "createdAt": "2025-03-26T12:01:00Z",
       "updatedAt": "2025-03-26T12:01:00Z"
     }
   ]
   ```

4. **Kategorie-Werte**: Wähle aus folgenden Optionen:

   - `icebreakers` - Leichte Einstiegsfragen
   - `confessions` - Geständnisse und Überraschungen
   - `personality` - Fragen zur Persönlichkeit
   - `deep-thoughts` - Tiefgründige Gedanken
   - `intimacy` - Fragen zu Nähe und Intimität
   - `growth` - Fragen zur persönlichen Entwicklung

5. **Schwierigkeitsgrad**: Wähle eine Zahl von 1 (leicht) bis 5 (herausfordernd)

### Installation des Kartensets:

1. **Zugriff auf das App-Verzeichnis**:

   - Verbinde dein Gerät mit einem Computer oder verwende eine Dateimanager-App
   - Navigiere zum Dokumenten-Verzeichnis der App (meist unter `/Documents/BondBridge` oder ähnlich)
   - Dort findest du den Ordner `cardsets`

2. **Kartenset kopieren**:

   - Kopiere deine `.json`-Datei in den `cardsets`-Ordner
   - Stelle sicher, dass die Datei die Endung `.json` hat

3. **App starten**:
   - Starte die BondBridge-App
   - Die App lädt automatisch alle gültigen Kartensets aus dem Verzeichnis
   - Bei erfolgreicher Integration erscheint eine Benachrichtigung
   - Die neuen Karten sind sofort in den entsprechenden Kategorien verfügbar

### Fehlerbehebung:

- **Kartenset wird nicht geladen**: Überprüfe das JSON-Format auf Syntaxfehler
- **Fehlende Elemente**: Stelle sicher, dass alle Pflichtfelder (id, question, category, difficulty) vorhanden sind
- **Falsche Kategorie**: Prüfe, ob die Kategorie genau einem der sechs erlaubten Werte entspricht
- **Duplikate**: Stelle sicher, dass alle Karten-IDs eindeutig sind

## Verzeichnisstruktur 📁

Die App verwendet eine feature-basierte Architektur:

```
src/
├── app/                 # App-Setup und Konfiguration
├── common/              # Gemeinsame Utilities, Konstanten, Typen
├── features/            # Feature-Module
│   ├── conversation-cards/
│   │   ├── components/   # Feature-spezifische Komponenten
│   │   ├── screens/      # Feature-Screens
│   │   ├── hooks/        # Custom Hooks
│   │   ├── utils/        # Hilfsfunktionen
│   │   ├── types/        # Typendefinitionen
│   │   ├── services/     # Feature-spezifische Services
│   │   │   └── cardsets/ # CardSet-Loader und -Verwaltung
├── navigation/          # Router und Navigation
├── store/               # Redux Store und Slices
└── theme/               # Design-System und Theming

memory-bank/            # Projektdokumentation
```

## Mitwirkung 👥

Bei der Weiterentwicklung der App sollten folgende Prinzipien beachtet werden:

1. **Offline-First**: Die App muss vollständig offline funktionieren.
2. **Typensicherheit**: Strenge TypeScript-Typen für alle Funktionen.
3. **Datenpersistenz**: Benutzeränderungen müssen persistent gespeichert werden.
4. **Validierung**: Externe Inhalte müssen validiert werden.
5. **UI-Performance**: Animationen und Übergänge müssen flüssig sein.
6. **Benutzerfreundlichkeit**: Intuitive Bedienung ohne komplexe Interaktionen.
7. **Sicherheit**: Abgesicherte Dateisystem-Zugriffe und Validierung externer Inhalte.

## Getting Started 🚀

Für die Entwicklung folgende Schritte befolgen:

1. Repository klonen
2. `npm install` ausführen
3. `expo start` für Entwicklungsserver
4. `npm run test` für Tests
5. Dateien im Memory-Bank-Ordner für Kontext und Richtlinien lesen
