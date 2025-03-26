# BondBridge Memory Bank

Version: 2.0.0
Letzte Aktualisierung: 2025-03-27 15:00:00
Status: 🟢 Aktiv

## Überblick 📖

Dokumentation für die BondBridge App — eine mobile Anwendung für Gesprächskarten mit Offline-Funktionalität und einfacher Integration externer Kartensets.

## Zentrale Dokumente 📑

| Datei                   | Inhalt                               |
| ----------------------- | ------------------------------------ |
| `activeContext.md`      | Aktueller Entwicklungsstatus         |
| `implementationPlan.md` | Plan für die Feature-Implementierung |
| `productContext.md`     | Features und Anforderungen           |
| `userStories.md`        | User Stories mit Akzeptanzkriterien  |
| `systemPatterns.md`     | Architekturmuster (für Entwickler)   |
| `uiPrinciples.md`       | Design-Richtlinien (für Entwickler)  |

## Kern-Features (MVP) ⭐

- **Conversation Cards** mit 6 Kategorien (von Icebreakers bis Intimacy)
- **Einfache Swipe-Funktion** zum Durchblättern der Karten
- **Grundlegende Filterung** nach Kategorien
- **Einfache Integration** externer Kartensets
- **Offline-Funktionalität** für Nutzung ohne Internet

## Projekt-Struktur 🏗️

```
src/
├── features/
│   ├── conversation-cards/
│   │   ├── components/  # UI-Komponenten
│   │   ├── screens/     # Bildschirme
│   │   └── services/    # Kartenset-Integration
├── navigation/          # App-Navigation
└── theme/               # Einfaches Styling
```

## Eigene Kartensets erstellen (Benutzeranleitung) 🧩

### So einfach geht's:

1. **Texteditor öffnen** (Notepad, TextEdit oder ähnliches)

2. **Neue Datei anlegen** mit folgendem Grundgerüst:

   ```json
   {
     "name": "Mein Kartenset",
     "description": "Meine eigenen Fragen",
     "version": "1.0",
     "cards": [
       {
         "question": "Was war dein schönstes Erlebnis im letzten Jahr?",
         "category": "icebreakers",
         "difficulty": 1
       },
       {
         "question": "Was ist deine größte Hoffnung für unsere Beziehung?",
         "category": "deep-thoughts",
         "difficulty": 3
       }
       // Weitere Karten hier hinzufügen
     ]
   }
   ```

3. **Kategorien** verwenden:

   - `icebreakers` - Leichte Einstiegsfragen
   - `confessions` - Geständnisse
   - `personality` - Persönlichkeit
   - `deep-thoughts` - Tiefgründige Gedanken
   - `intimacy` - Nähe und Intimität
   - `growth` - Persönliche Entwicklung

4. **Schwierigkeit** festlegen:

   - 1 = Sehr einfach
   - 5 = Sehr tiefgründig/persönlich

5. **Speichern** als `mein-kartenset.json`

6. **Installation**:
   - Datei in den `cardsets`-Ordner der App kopieren
   - App neu starten

> **Tipp**: Beginne mit wenigen Karten (5-10) und teste dein Set, bevor du weitere hinzufügst!

## Für Entwickler 👨‍💻

Die komplette technische Dokumentation findest du in den Dateien `systemPatterns.md` und `implementationPlan.md`. Dort werden die Architektur, Coding-Standards und der Implementierungsplan detailliert beschrieben.
