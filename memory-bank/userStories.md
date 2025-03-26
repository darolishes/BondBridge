# User Stories

Version: 1.2.0
Last Updated: 2025-03-26 15:42:00
Status: 🟢 Active

## High Priority ⚡

### Conversation Cards

- **US-101**: Als Nutzer möchte ich Gesprächskarten swipen können, um intuitiv durch verschiedene Gesprächsthemen zu navigieren.

  - AC1: Swipe nach rechts markiert eine Karte als "gemocht" und zeigt die nächste Karte
  - AC2: Swipe nach links überspringt die aktuelle Karte
  - AC3: Während des Swipes wird eine Animation angezeigt, die Feedback zur Richtung gibt
  - AC4: Nach dem Swipe wird nahtlos die nächste Karte angezeigt
  - Priority: 🔥 Critical
  - Story Points: 8

- **US-102**: Als Nutzer möchte ich Karten nach Kategorien filtern können, um gezielt Gespräche zu bestimmten Themen zu führen.

  - AC1: Es gibt Filter für alle 6 Kategorien (Icebreakers, Confessions, Personality, Deep Thoughts, Intimacy, Growth)
  - AC2: Mehrere Kategorien können gleichzeitig ausgewählt werden
  - AC3: Die Kartenauswahl aktualisiert sich sofort nach Filteränderung
  - AC4: Die aktiven Filter werden visuell hervorgehoben
  - Priority: 🔥 Critical
  - Story Points: 5

- **US-103**: Als Nutzer möchte ich Karten nach Schwierigkeitsgrad filtern können, um das Gespräch progressiv zu vertiefen.

  - AC1: Es gibt Filter für 5 Schwierigkeitsgrade
  - AC2: Der Schwierigkeitsgrad wird auf jeder Karte angezeigt
  - AC3: Mehrere Schwierigkeitsgrade können gleichzeitig ausgewählt werden
  - Priority: 🔥 Critical
  - Story Points: 5

- **US-104**: Als Nutzer möchte ich die Nachfragen zu einer Hauptfrage sehen können, um das Gespräch zu vertiefen.

  - AC1: Nachfragen werden auf der Karte angezeigt oder können aufgeklappt werden
  - AC2: Nachfragen sind visuell von der Hauptfrage unterschieden
  - AC3: Nachfragen sind optional und können übersprungen werden
  - Priority: 🔆 High
  - Story Points: 3

- **US-105**: Als Nutzer möchte ich Karten als Favoriten markieren können, um sie später wiederzufinden.
  - AC1: Jede Karte hat eine Favoriten-Schaltfläche
  - AC2: Favorisierte Karten werden in einem separaten Bereich gesammelt
  - AC3: Favoriten können wieder entfernt werden
  - Priority: 🔆 High
  - Story Points: 3

### Offline Functionality

- **US-201**: Als Nutzer möchte ich die App offline nutzen können, ohne Internetverbindung.
  - AC1: Alle Karten werden lokal gespeichert
  - AC2: Die App funktioniert vollständig ohne Internetverbindung
  - AC3: Änderungen werden lokal gespeichert und bei Bedarf synchronisiert
  - Priority: 🔥 Critical
  - Story Points: 5

### Automatic Card Set Loading

- **US-202**: Als System möchte ich automatisch neue Kartensets aus einem speziellen Verzeichnis laden, um die App ohne UI-Interaktion zu erweitern.

  - AC1: Die App erstellt ein spezielles Verzeichnis auf dem Gerät für Kartensets
  - AC2: Das System erkennt JSON-Dateien im Kartenset-Verzeichnis automatisch
  - AC3: Neue Kartensets werden validiert und bei gültiger Struktur integriert
  - AC4: Integration erfolgt automatisch beim App-Start und in regelmäßigen Abständen
  - Priority: 🔥 Critical
  - Story Points: 8

- **US-203**: Als Nutzer möchte ich informiert werden, wenn neue Kartensets erkannt und geladen wurden.
  - AC1: Ein Hinweis wird angezeigt, wenn neue Sets gefunden wurden
  - AC2: Die Anzahl neuer Karten wird angezeigt
  - AC3: Die neuen Sets werden in der Kategorie-Auswahl hervorgehoben
  - Priority: 🔆 High
  - Story Points: 3

## Medium Priority 🔶

- **US-301**: Als Nutzer möchte ich sehen können, welche Karten ich bereits gesehen habe.

  - AC1: Gesehene Karten werden als solche markiert
  - AC2: Es gibt eine Option, gesehene Karten zurückzusetzen
  - AC3: Es gibt eine Option, gesehene Karten herauszufiltern
  - Priority: 🔶 Medium
  - Story Points: 3

- **US-302**: Als Nutzer möchte ich die Sprache der App ändern können.

  - AC1: Die App unterstützt Deutsch und Englisch
  - AC2: Sprachänderungen werden sofort wirksam
  - AC3: Die Spracheinstellung wird gespeichert
  - Priority: 🔶 Medium
  - Story Points: 5

- **US-303**: Als Nutzer möchte ich das Farbschema der App anpassen können.

  - AC1: Die App unterstützt Hell- und Dunkelmodus
  - AC2: Der Modus kann manuell oder systembasiert gewechselt werden
  - AC3: Farbwechsel werden auf alle Screens angewendet
  - Priority: 🔶 Medium
  - Story Points: 3

- **US-304**: Als Nutzer möchte ich den Fortschritt durch die Kartensets sehen können.

  - AC1: Ein Fortschrittsbalken zeigt an, wie viele Karten bereits gesehen wurden
  - AC2: Der Fortschritt wird pro Kategorie angezeigt
  - AC3: Der Fortschritt wird gespeichert
  - Priority: 🔶 Medium
  - Story Points: 3

- **US-305**: Als Entwickler möchte ich eine klare Dokumentation für das Format externer Kartensets haben.
  - AC1: Die Dokumentation definiert das JSON-Schema klar und verständlich
  - AC2: Beispiele für gültige Kartensets werden bereitgestellt
  - AC3: Häufige Fehler und deren Behebung werden dokumentiert
  - Priority: 🔶 Medium
  - Story Points: 2

## Low Priority 🔽

- **US-401**: Als System möchte ich fehlerhafte Kartensets protokollieren, um Benutzern Feedback zu geben.

  - AC1: Validierungsfehler werden mit klaren Meldungen protokolliert
  - AC2: Bei Bedarf wird ein Protokoll erstellt, das Benutzer einsehen können
  - AC3: Die spezifische Ursache des Fehlers wird angegeben
  - Priority: 🔽 Low
  - Story Points: 3

- **US-402**: Als Nutzer möchte ich defekte oder fehlerhafte Kartensets entfernen können.

  - AC1: Eine Liste aller Kartensets mit Status wird angezeigt
  - AC2: Fehlerhafte Sets können aus der App entfernt werden
  - AC3: Ein Fehlerbericht kann für Entwickler generiert werden
  - Priority: 🔽 Low
  - Story Points: 5

- **US-403**: Als Nutzer möchte ich Feedback zu Karten geben können.
  - AC1: Feedback-Formular für jede Karte
  - AC2: Bewertung von 1-5 Sternen
  - AC3: Optionales Textfeedback
  - Priority: 🔽 Low
  - Story Points: 5

## Completed Stories ✅

_Noch keine abgeschlossenen Stories_
