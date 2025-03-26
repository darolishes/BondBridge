# Product Context

Version: 1.2.0
Last Updated: 2025-03-26 15:35:00
Status: 🟢 Active
Related Files: activeContext.md, decisionLog.md

## Project Goal 🎯

Entwicklung einer mobilen App zur Förderung der Kommunikation zwischen Paaren durch swipeable Gesprächskarten mit kompletter Offline-Funktionalität und automatischer Integration externer Kartensets.

## Core Features ⭐

- ✅ Swipeable Karten in 6 Kategorien (Icebreakers, Confessions, Personality, Deep Thoughts, Intimacy, Growth)
- ✅ Verschiedene Schwierigkeitsgrade (1-5) für progressives Vertiefen
- ✅ Hauptfragen mit optionalen Nachfragen
- ✅ Automatische Integration externer Kartensets aus definiertem Verzeichnis
- ✅ Minimalistisches UI mit Dark Mode
- ✅ Komplette Offline-Funktionalität
- ✅ Fortschrittsverfolgung und Favoriten

## Architecture 🏗️

- Mobile: React Native mit Expo

  - Status: Selected ✅
  - Rationale: Siehe decisionLog.md#architecture-decisions

- State Management: Redux Toolkit + Redux Persist

  - Status: Selected ✅
  - Implementation: In Progress 🔄

- Animation: React Native Reanimated + Gesture Handler

  - Status: Selected ✅
  - Implementation: In Progress 🔄

- Local Storage: AsyncStorage

  - Status: Selected ✅
  - Implementation: Pending 🔄

- Filesystem Access: react-native-fs

  - Status: Selected ✅
  - Implementation: Pending 🔄

- CI/CD: GitHub Actions
  - Status: Planned 📋
  - Implementation: Not Started

## Technical Requirements 📋

- TypeScript strict mode enabled
- Minimum iOS version: 13.0
- Minimum Android version: 8.0
- Offline-first architecture
- Fokus auf Swipe-Interaktionen
- Kartenbasierte UI statt Listen
- Kategorien und Schwierigkeitsfilter
- Optimierte Animation und Übergänge
- Automatisches Laden externer Kartensets aus spezifischem Verzeichnis

## Card Data Model 📊

```typescript
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

// Schema für externe Kartensets
interface ExternalCardSet {
  id: string;
  name: string;
  description: string;
  version: string;
  cards: ConversationCard[];
}
```

## Integration Points 🔄

- Automatisches Laden von Kartensets aus dem Geräte-Dateisystem
- AsyncStorage zur persistenten Speicherung des App-Status
- Theme system integration
- Analytics integration (planned)

## Main User Flows 👤

1. Browse and swipe conversation cards
2. Filter cards by category and difficulty
3. View follow-up questions for deeper conversations
4. Mark favorite cards for later reference
5. Automatische Integration neuer Kartensets (ohne UI-Interaktion)
6. Track progress through card sets

## External Card Set Integration 🔄

- Die App erstellt ein spezielles Verzeichnis im app-spezifischen Speicher
- Benutzer können JSON-Dateien mit neuen Kartensets in dieses Verzeichnis kopieren
- Die App scannt dieses Verzeichnis beim Start und in regelmäßigen Abständen
- Neue Kartensets werden automatisch validiert und integriert
- Eindeutiges Schema und Validierung stellen sicher, dass nur gültige Kartensets geladen werden
