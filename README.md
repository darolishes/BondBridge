# BondBridge 💞

Eine mobile App zur Förderung der Kommunikation zwischen Paaren durch interaktive Gesprächskarten.

## Über BondBridge 📖

BondBridge hilft Paaren, ihre Beziehung durch bedeutungsvolle Gespräche zu vertiefen. Die App bietet swipeable Gesprächskarten in verschiedenen Kategorien und Schwierigkeitsgraden - ähnlich wie Tinder, aber für tiefgründige Gespräche! 🎯

## Features ⭐

- **Swipeable Karten**: Intuitive Karteninteraktion durch Wischgesten (rechts für "gefällt mir", links für "überspringen")
- **Thematische Kategorien**: 6 verschiedene Kategorien (Icebreakers, Confessions, Personality, Deep Thoughts, Intimacy, Growth)
- **Progressive Schwierigkeit**: 5 Schwierigkeitsstufen für ein schrittweises Vertiefen der Kommunikation
- **Begleitende Nachfragen**: Jede Karte enthält Hauptfragen und optionale Nachfragen
- **Offline-Modus**: 100% offline nutzbar, keine Internetverbindung erforderlich
- **Externe Kartensets**: Einfache Erweiterung durch benutzerdefinierte Kartensets
- **Dark Mode**: Augenschonendes Design für Tag und Nacht

## Technologien 🔧

- **Framework**: React Native mit Expo
- **State Management**: Redux Toolkit mit AsyncStorage-Persistenz
- **UI/UX**: Benutzerdefinierte Animationen mit React Native Reanimated
- **Navigation**: React Navigation
- **Entwicklung**: TypeScript, ESLint, Prettier

## Kartenset-Erweiterung 🧩

BondBridge ermöglicht dir, eigene Kartensets zu erstellen:

1. Erstelle eine JSON-Datei mit deinen Fragen
2. Platziere sie im spezifischen App-Verzeichnis
3. Die App lädt und validiert automatisch deine Kartensets

[Ausführliche Anleitung](./memory-bank/README.md#erstellung-eigener-kartensets-für-benutzer)

## Installation und Entwicklung 🚀

1. Repository klonen

   ```bash
   git clone https://github.com/darolishes/bondbridge.git
   cd bondbridge
   ```

2. Abhängigkeiten installieren

   ```bash
   npm install
   ```

3. Entwicklungsserver starten

   ```bash
   npm start
   # oder
   expo start
   ```

4. Tests ausführen
   ```bash
   npm test
   ```

## Projektdokumentation 📚

Ausführliche Dokumentation über die App-Architektur, Implementierungsdetails und Entwicklungsentscheidungen findest du im [Memory Bank](./memory-bank) Verzeichnis.

## Lizenz 📄

BondBridge ist ein Open-Source-Projekt unter der [MIT-Lizenz](LICENSE).

## Mitwirken 👥

Beiträge sind herzlich willkommen! Wenn du helfen möchtest, die App zu verbessern, folge bitte unseren [Richtlinien für Mitwirkende](./memory-bank/README.md#mitwirkung).

---

Entwickelt mit ❤️ für Paare, die ihre Beziehung durch bedeutungsvolle Gespräche vertiefen möchten.
