# Roadmap

Version: 1.3.0
Last Updated: 2025-03-26 15:45:00
Status: 🟢 Active

## Überblick 🔭

Dieses Dokument definiert die Entwicklungs-Roadmap für die BondBridge App mit Schwerpunkt auf Swipeable Conversation Cards und automatischer Integration externer Kartensets.

## Aktuelle Milestone: MVP (Alpha) 🏆

**Deadline:** Ende Q2 2025
**Status:** In Entwicklung 🔄

### Features:

- ✅ Projekt-Setup mit React Native und Expo
- ✅ Theme-System mit Dark/Light Mode
- ✅ Navigation-Struktur
- 🔄 Swipeable Conversation Cards
  - 🔄 Basis Card-Komponente
  - 🔄 Swipe-Gestenerkennung
  - 🔄 Kategoriefilter
  - 🔄 Schwierigkeitsfilter
  - 🔄 Favoritenfunktion
  - 📅 Animation & Transition
- 📅 Redux State Management
  - 📅 Cards-Slice
  - 📅 Favorites-Slice
  - 📅 Settings-Slice
- 📅 Offline-Funktionalität
  - 📅 AsyncStorage-Integration
  - 📅 Redux Persist
- 📅 Externe Kartenset-Integration
  - 📅 Dateisystem-Verzeichnis einrichten
  - 📅 Automatischer Scan mit react-native-fs
  - 📅 JSON-Schema-Validierung
  - 📅 Integration in Redux Store

## Milestone 2: Beta 🚀

**Deadline:** Mitte Q3 2025
**Status:** Geplant 📋

### Features:

- 📋 Kartenset-Verwaltung
  - 📋 Anzeige installierter Kartensets
  - 📋 Deaktivieren/Aktivieren von Sets
  - 📋 Fehlerbehandlung für invalide Sets
- 📋 Fortschrittsanzeige
  - 📋 Statistiken zu gesehenen Karten
  - 📋 Kategorie-Fortschritt
- 📋 Mehrsprachigkeit
  - 📋 Englisch
  - 📋 Deutsch
- 📋 Verbessertes UI
  - 📋 Animationen & Transitions
  - 📋 Micro-Interactions
- 📋 Onboarding-Erfahrung

## Milestone 3: 1.0 Release 🎉

**Deadline:** Ende Q3 2025
**Status:** Geplant 📋

### Features:

- 📋 Performance-Optimierungen
  - 📋 Lazy Loading
  - 📋 Verbesserte Animationen
- 📋 Erweiterte Filteroptionen
  - 📋 Textbasierte Suche
  - 📋 Tags
- 📋 Erweitertes Dateisystem
  - 📋 Verbessertes Logging
  - 📋 Backup für Benutzerdaten
- 📋 Content-Validation
  - 📋 Verbesserte Validierungsfehlermeldungen
  - 📋 Kartenvorschau

## Zukünftige Ideen 💡

### Couple Mode (Q4 2025)

- 📋 Gemeinsames Kartendeck für Paare
- 📋 Einfache Synchronisation zwischen zwei Geräten
- 📋 Gegenseitige Bewertungen und Reaktionen

### Challenges (Q1 2026)

- 📋 Tägliche Herausforderungen
- 📋 Wöchentliche Themen
- 📋 Streaks und Belohnungen

### Community Kartensets (Q2 2026)

- 📋 Online-Verzeichnis für Kartensets
- 📋 Einfaches Installieren von validierten Sets
- 📋 Kuratierte Sammlungen

## Release-Plan 📅

| Version | Codename    | Datum   | Hauptfeatures                                |
| ------- | ----------- | ------- | -------------------------------------------- |
| 0.1.0   | Alpha       | Q2 2025 | Swipeable Cards, Basis-Funktionalität        |
| 0.2.0   | Beta        | Q3 2025 | Offline-Modus, Externe Kartensets            |
| 1.0.0   | Release     | Q3 2025 | Vollständige Basis-App                       |
| 1.1.0   | Enhancement | Q4 2025 | Couple Mode                                  |
| 1.2.0   | Challenges  | Q1 2026 | Herausforderungen und Streaks                |
| 2.0.0   | Community   | Q2 2026 | Community-Kartensets und Content-Kuratierung |

## Priorisierungskriterien 📊

Bei der Entwicklung werden folgende Kriterien für Priorisierungsentscheidungen verwendet:

1. **User Value**: Wie sehr profitieren Nutzer von diesem Feature?
2. **Technical Complexity**: Wie komplex ist die Implementierung?
3. **Dependencies**: Sind andere Features davon abhängig?
4. **Resource Availability**: Haben wir die nötigen Ressourcen?
5. **Strategic Alignment**: Passt es zur Gesamtvision der App?

## Technische Meilensteine 🛠️

### Infrastruktur

- ✅ React Native mit Expo Setup
- ✅ TypeScript-Konfiguration
- 🔄 Redux Toolkit Integration
- 📋 CI/CD-Pipeline
- 📋 Automatisierte Tests

### UX/UI

- ✅ Design-System und Theme
- 🔄 Kern-UI-Komponenten
- 🔄 Animation Framework
- 📋 Barrierefreiheit
- 📋 Responsive Design

### Backend & Daten

- 🔄 Lokale Datenpersistenz
- 📋 Dateisystem-Integration
- 📋 Offline-First-Architektur
- 📋 Schema-Validierung

## Risiken & Mitigationen ⚠️

| Risiko                                  | Wahrscheinlichkeit | Auswirkung | Mitigation                                                               |
| --------------------------------------- | ------------------ | ---------- | ------------------------------------------------------------------------ |
| Performance bei komplexen Animationen   | Hoch               | Mittel     | Frühe Prototypen, Optimierung mit Reanimated                             |
| Offline-Synchronisation                 | Mittel             | Hoch       | Robustes State Management, Conflict Resolution                           |
| Dateisystem-Berechtigungen              | Hoch               | Hoch       | Frühzeitiges Testen auf verschiedenen OS-Versionen, Fallback-Mechanismen |
| Korrupte externe Kartensets             | Mittel             | Hoch       | Strikte Validierung, Isolierte Fehlerbehandlung                          |
| UX-Konsistenz auf verschiedenen Geräten | Mittel             | Mittel     | Umfassendes Testing auf verschiedenen Geräten                            |
| Skalierbarkeit für große Kartensets     | Niedrig            | Hoch       | Virtualisierung, Lazy Loading                                            |

## Erfolgsmetriken 📈

- **Nutzerbindung**: Durchschnittliche Nutzungsdauer pro Session
- **Wiederkehrende Nutzer**: 7-Tage und 30-Tage Retention
- **Feature-Nutzung**: % der genutzten Kategorien und Schwierigkeitsgrade
- **Favoriten**: Durchschnittliche Anzahl favorisierter Karten pro Nutzer
- **Kartensets**: Anzahl und Häufigkeit der installierten externen Kartensets
