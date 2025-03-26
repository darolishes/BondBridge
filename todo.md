# BondBridge Todo-Tracking

Version: 1.0.0
Letzte Aktualisierung: 2025-03-27
Status: 🟢 Aktiv

> Dieses Dokument dient dem Tracking von Aufgaben und Fortschritt im BondBridge-Projekt.
> Für umfassende Kontextinformationen siehe die Dokumente in `memory-bank/`.

## 📚 Legende der Status-Emojis

| Emoji | Status             | Beschreibung                                  |
| ----- | ------------------ | --------------------------------------------- |
| 📋    | Todo               | Aufgabe noch nicht begonnen                   |
| 🏗️    | In Bearbeitung     | Aufgabe wird aktuell bearbeitet               |
| ✅    | Abgeschlossen      | Aufgabe vollständig abgeschlossen             |
| ⏸️    | Pausiert           | Vorübergehend zurückgestellt                  |
| 🚫    | Blockiert          | Kann nicht fortgesetzt werden (Grund angeben) |
| 🔄    | Review             | Fertig, benötigt Überprüfung                  |
| 🔥    | Hohe Priorität     | Kritisch für das Projekt                      |
| 🔽    | Niedrige Priorität | Kann verschoben werden                        |
| 📆    | Zukünftige Version | Für spätere Implementierung geplant           |

## 🏗️ Core App Setup

> Grundlegende Projekteinrichtung und Infrastruktur
> **Referenz:** `memory-bank/activeContext.md`

**Status:** ✅ Abgeschlossen (100%)
**Verantwortlich:** Entwicklungsteam
**Deadline:** Abgeschlossen

### Stories

- ✅ **Projekt-Grundstruktur**

  - Referenz: `memory-bank/systemPatterns.md`
  - ✅ Repository einrichten
  - ✅ Feature-basierte Ordnerstruktur erstellen
  - ✅ Grundlegende Navigation implementieren

- ✅ **Entwicklungsumgebung**
  - ✅ React Native mit Expo aufsetzen
  - ✅ TypeScript-Konfiguration
  - ✅ Basis-Theme einrichten

## 🏗️ Conversation Cards (MVP)

> Implementierung der grundlegenden Kartenansicht und -interaktion
> **Referenz:** `memory-bank/implementationPlan.md`, `memory-bank/userStories.md`

**Status:** 🏗️ In Entwicklung (30%)
**Verantwortlich:** UI-Team
**Deadline:** 2025-04-15

### Stories

- 🏗️ **[US-101] Einfache Card-Komponente**

  - Referenz: `memory-bank/userStories.md` (US-101)
  - Beschreibung: Darstellung von Gesprächskarten mit Basisfunktionalität

  #### Tasks

  - 🏗️ Card-Komponente mit Kategorie-Indikator
  - 🏗️ Hauptfrage-Darstellung
  - 📋 Grundlegende Styles basierend auf `memory-bank/uiPrinciples.md`

- 📋 **[US-102] Grundlegende Navigation**

  - Referenz: `memory-bank/userStories.md` (US-102)
  - Beschreibung: Vor/Zurück-Navigation zwischen Karten

  #### Tasks

  - 📋 Navigations-Buttons implementieren
  - 📋 Einfache Swipe-Geste hinzufügen
  - 📋 Navigation-State verwalten

## 📋 Kategoriefilter

> Implementierung der Filterfunktionalität nach Kategorien
> **Referenz:** `memory-bank/implementationPlan.md`, `memory-bank/userStories.md`

**Status:** 📋 Nicht begonnen (0%)
**Verantwortlich:** UI-Team
**Deadline:** 2025-04-22

### Stories

- 📋 **[US-103] Kategorie-Auswahl**

  - Referenz: `memory-bank/userStories.md` (US-103)
  - Beschreibung: Filter-UI für 6 Kategorien

  #### Tasks

  - 📋 Filter-Komponente erstellen
  - 📋 Interaktives Umschalten der Filter
  - 📋 Visuelle Darstellung des Filter-Status

- 📋 **Filter-Integration**

  - Beschreibung: Anwendung der ausgewählten Filter auf Kartendaten

  #### Tasks

  - 📋 Filter-Logik implementieren
  - 📋 Filter mit Cards-Komponente verbinden
  - 📋 Filter-State speichern

## 📋 Externe Kartenset-Integration

> Implementierung der Funktionalität für externe Kartensets
> **Referenz:** `memory-bank/productContext.md`, `memory-bank/implementationPlan.md`

**Status:** 📋 Nicht begonnen (5%)
**Verantwortlich:** Backend-Team
**Deadline:** 2025-04-29

### Stories

- 📋 **[US-202] Externe Kartensets laden**

  - Referenz: `memory-bank/userStories.md` (US-202)
  - Beschreibung: Laden und Validieren externer JSON-Dateien

  #### Tasks

  - 🏗️ Verzeichnisstruktur für Kartensets erstellen
  - 📋 react-native-fs für Dateizugriff implementieren
  - 📋 JSON-Validierungssystem entwickeln
  - 📋 Integration in die Kartensammlung

## 📋 Offline-Funktionalität

> Sicherstellung der Offline-Nutzbarkeit der App
> **Referenz:** `memory-bank/productContext.md`

**Status:** 📋 Nicht begonnen (0%)
**Verantwortlich:** Backend-Team
**Deadline:** 2025-05-06

### Stories

- 📋 **[US-201] Persistente Datenspeicherung**

  - Referenz: `memory-bank/userStories.md` (US-201)
  - Beschreibung: Lokale Speicherung von Karten und Einstellungen

  #### Tasks

  - 📋 AsyncStorage-Integration
  - 📋 Speicherschema entwerfen
  - 📋 Datenlade- und -speicherfunktion implementieren

## 📆 Post-MVP Erweiterungen

> Vorbereitung und Planung für zukünftige Features
> **Referenz:** `memory-bank/roadmap.md`

**Status:** 📆 Zukünftige Version
**Deadline:** Nach MVP-Abschluss

### Geplante Features

- 📆 **Erweiterte Swipe-Funktionen**

  - Referenz: `memory-bank/userStories.md` (US-301)

- 📆 **Schwierigkeitsfilter**

  - Referenz: `memory-bank/userStories.md` (US-302)

- 📆 **Nachfragen zu Hauptfragen**

  - Referenz: `memory-bank/userStories.md` (US-303)

- 📆 **Favoriten-System**

  - Referenz: `memory-bank/userStories.md` (US-304)

- 📆 **Dark Mode**
  - Referenz: `memory-bank/userStories.md` (US-305)

## 📊 Fortschritts-Tracking

| Epic                          | Status    | Fortschritt |
| ----------------------------- | --------- | ----------- |
| Core App Setup                | ✅ Fertig | 100%        |
| Conversation Cards (MVP)      | 🏗️ Aktiv  | 30%         |
| Kategoriefilter               | 📋 Todo   | 0%          |
| Externe Kartenset-Integration | 📋 Todo   | 5%          |
| Offline-Funktionalität        | 📋 Todo   | 0%          |
| **Gesamt-MVP**                | 🏗️ Aktiv  | 27%         |

---

> Dieses Dokument sollte regelmäßig mit dem aktuellen Projektfortschritt aktualisiert werden.
> Weitere Projektdokumentationen sind in der `memory-bank/`-Verzeichnis zu finden.
