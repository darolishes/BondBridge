# Produkt-Kontext

Version: 2.0.0
Letzte Aktualisierung: 2025-03-27 15:00:00
Status: 🟢 Aktiv

## Ziel 🎯

Mobile App zur Förderung der Kommunikation zwischen Paaren durch Gesprächskarten mit Offline-Funktionalität.

## Kernfeatures (MVP) ⭐

| Feature                | Status | Beschreibung                              |
| ---------------------- | ------ | ----------------------------------------- |
| **Conversation Cards** | 🟡     | Einfache Kartenansicht mit Swipe-Funktion |
| **Kategorien**         | 🟡     | Grundlegende Filterung nach 6 Kategorien  |
| **Externe Kartensets** | 🟡     | Einfache Integration von JSON-Dateien     |
| **Offline-Modus**      | 🟡     | Grundlegende Funktionalität ohne Internet |

## Zukünftige Features (Post-MVP) 🔮

| Feature                 | Priorität | Beschreibung                             |
| ----------------------- | --------- | ---------------------------------------- |
| **Schwierigkeitsgrade** | 🔆 Medium | 5-stufige Progressive Intimität          |
| **Nachfragen**          | 🔆 Medium | Zusätzliche Fragen für tiefere Gespräche |
| **Favorites**           | 🔽 Low    | Speichern besonders wertvoller Karten    |
| **Dark Mode**           | 🔽 Low    | Optimierter Modus für abendliche Nutzung |
| **Komplexe Animation**  | 🔽 Low    | Erweiterte visuelle Effekte und Feedback |

## Technologie (MVP) 🔧

- **Framework**: React Native mit Expo
- **State**: Einfaches State Management
- **Validierung**: Grundlegende Typdefinitionen
- **Dateisystem**: react-native-fs für Kartensets

## Datenmodell (Zentrale Definition) 📊

```typescript
// Basismodell für die gesamte App
type CardCategory =
  | "icebreakers"
  | "confessions"
  | "personality"
  | "deep-thoughts"
  | "intimacy"
  | "growth";

type ConversationCard = {
  id: string;
  question: string;
  followUpQuestions?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: CardCategory;
};

type ExternalCardSet = {
  id: string;
  name: string;
  description: string;
  version: string;
  cards: ConversationCard[];
};
```

## Benutzer-Flows (MVP) 👤

1. **Karteninteraktion**: Einfaches Durchblättern von Gesprächskarten
2. **Filterung**: Grundlegende Filterung nach Kategorie
3. **Kartensets**: Einfache Integration externer Kartensets

## Externe Kartenset-Integration (MVP) 🔄

- Einfacher Import-Mechanismus für JSON-Dateien
- Grundlegende Validierung des Formats
- Integration in die Kartensammlung

## Technische Anforderungen (MVP) 📋

- Einfaches, funktionales UI ohne komplexe Animationen
- Grundlegende Offline-Funktionalität
- Minimalistische, benutzerfreundliche Oberfläche
- Fokus auf Stabilität und Kernfunktionen
