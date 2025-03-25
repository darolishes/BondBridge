# ProjectBrief BondBridge

_Erstellt am: 2025-03-24_

_BondBridge_ ist eine mobile Anwendung, die Paaren hilft, ihre Beziehungen durch bedeutungsvolle Gesprächskarten zu vertiefen. Die App bietet swipe-fähige Karten in thematischen Kategorien und ermöglicht den Import neuer Kartensets über JSON-Dateien. Mit einem minimalistischen, einladenden Design und vollständiger Offline-Funktionalität zielt die erste Version darauf ab, eine einfache, authentifizierungsfreie Erfahrung zu bieten.

### Zielgruppe

- Paare (jeden Alters), die ihre Kommunikation und Bindung stärken möchten.
- Technikaffine Nutzer, die eine unkomplizierte mobile Lösung schätzen.

## Projektziele

- Bereitstellung einer ansprechenden, offline-fähigen Plattform für Paare zur Förderung von Gesprächen.
- Flexible Verwaltung von Inhalten über JSON-basierte Kartensets ohne Benutzerkonten in der ersten Version.
- Entwicklung eines skalierbaren Systems für zukünftige Erweiterungen.
- Fokus auf Benutzerfreundlichkeit mit minimalistischem Design und Fortschrittsverfolgung.

## Hauptmerkmale

- **Gesprächskarten**: Swipe-fähige Karten mit Fragen, optionalen Nachfragen und Schwierigkeitsstufen, organisiert in Kategorien (Icebreakers, Confessions, Personality, Deep Thoughts, Intimacy, Growth).
- **Inhaltsverwaltung**: Import von Kartensets im JSON-Format, inklusive Bildunterstützung.
- **Benutzeroberfläche**: Minimalistisches Design mit warmen Farben, Kategorie-Filtern, Dunkelmodus und Fortschrittsanzeigen.
- **Offline-Funktionalität**: Lokale Speicherung von Daten und Fortschritt.

## Technische Anforderungen

- **Plattform**: iOS (14+) und Android (10+), entwickelt mit React Native und Expo.
- **Sprache**: TypeScript für Typsicherheit.
- **UI-Komponenten**: React Native Elements.
- **Styling**: NativeWind (Tailwind CSS für React Native).
- **Animationen**: React Native Reanimated.
- **Speicherung**: AsyncStorage für lokale Persistenz.

## Erfolgskriterien

- Intuitive Navigation und reibungsloses Swiping.
- Zuverlässige Fortschrittsverfolgung über Sitzungen hinweg.
- Erfolgreicher Import von JSON-Dateien mit Fehlerbehandlung.
- Positive Nutzererfahrung basierend auf Design und Funktionalität.

## Annahmen und Einschränkungen

- **Annahmen**:
  - Nutzer verfügen über grundlegende Smartphone-Kenntnisse.
  - JSON-Dateien folgen einem vordefinierten Schema.
- **Einschränkungen**:
  - Keine Authentifizierung oder Benutzerkonten in der ersten Version.
  - Keine Cloud-Integration oder Synchronisation initially.
