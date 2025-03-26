# User Stories

Version: 2.0.0
Letzte Aktualisierung: 2025-03-28 12:00:00
Status: 🟢 Aktiv

## Verbindung mit AI-gespeicherten User Stories

Ausführliche User Stories und Epics sind im `.ai/stories/` Verzeichnis in folgender Struktur gespeichert:

```
.ai/stories/
  ├── epic-1/ (User Onboarding & Profile)
  │   ├── story-1.md (Welcome Experience)
  ├── epic-2/ (Core Conversation Cards Functionality)
  │   ├── story-1.md (Card Component)
  │   ├── story-2.md (Card Navigation)
  │   ├── story-3.md (Category Filtering)
  ├── epic-3/ (Conversation Progress Tracking)
  │   ├── story-2.md (Favorite Cards)
  └── epic-4/ (External Card Set Integration)
      ├── story-1.md (Card Set Import)
```

## MVP - Kernfunktionalität ⚡

| ID         | Story                                                                                    | Akzeptanzkriterien                                                    | Priorität | Status            |
| ---------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------- | ----------------- |
| **US-101** | **Einfache Kartenansicht** <br> Als Nutzer möchte ich Gesprächskarten ansehen können.    | • Klare Darstellung der Frage <br> • Anzeige der Kategorie            | 🔥 High   | 🟡 In Entwicklung |
| **US-102** | **Grundlegende Navigation** <br> Als Nutzer möchte ich durch die Karten blättern können. | • Vor/Zurück-Navigation <br> • Einfache Swipe-Geste                   | 🔥 High   | 🟡 In Entwicklung |
| **US-103** | **Kategoriefilter** <br> Als Nutzer möchte ich Karten nach Kategorien filtern können.    | • Alle 6 Kategorien wählbar <br> • Einfache Ein/Aus-Filterung         | 🔥 High   | 🟡 In Entwicklung |
| **US-201** | **Offline-Nutzung** <br> Als Nutzer möchte ich die App ohne Internet nutzen können.      | • Grundlegende Funktionalität ohne Netzwerk                           | 🔥 High   | 📋 Geplant        |
| **US-202** | **Externe Kartensets** <br> Als Nutzer möchte ich eigene Kartensets hinzufügen können.   | • Einfacher Import-Mechanismus <br> • Grundlegende Format-Validierung | 🔥 High   | 📋 Geplant        |

## Zukünftige Erweiterungen (Post-MVP) 🔮

| ID         | Story                                                                                              | Akzeptanzkriterien                                                                                    | Priorität | Status     |
| ---------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------- | ---------- |
| **US-301** | **Erweiterte Swipe-Funktionen** <br> Als Nutzer möchte ich erweiterte Swipe-Animationen erleben.   | • Visuelle Feedback-Animationen <br> • Swipe rechts = "gefällt mir" <br> • Swipe links = überspringen | 🔆 Medium | 📋 Geplant |
| **US-302** | **Schwierigkeitsfilter** <br> Als Nutzer möchte ich Karten nach Schwierigkeitsgrad filtern können. | • 5 Schwierigkeitsgrade wählbar <br> • Visuelle Anzeige auf Karten                                    | 🔆 Medium | 📋 Geplant |
| **US-303** | **Nachfragen** <br> Als Nutzer möchte ich Nachfragen zu Hauptfragen sehen können.                  | • Visuell von Hauptfrage unterscheidbar                                                               | 🔆 Medium | 📋 Geplant |
| **US-304** | **Favorites** <br> Als Nutzer möchte ich Karten als Favoriten markieren können.                    | • Favoriten-Button auf jeder Karte <br> • Separate Favoriten-Ansicht                                  | 🔽 Low    | 📋 Geplant |
| **US-305** | **Dark Mode** <br> Als Nutzer möchte ich das Farbschema der App anpassen können.                   | • Hell- und Dunkelmodus                                                                               | 🔽 Low    | ✅ Fertig  |
| **US-306** | **Kartenset-Management** <br> Als Nutzer möchte ich meine Kartensets verwalten können.             | • Liste aller Sets <br> • Aktivieren/Deaktivieren                                                     | 🔽 Low    | 📋 Geplant |
| **US-307** | **Benachrichtigungen** <br> Als Nutzer möchte ich über neue Kartensets informiert werden.          | • Hinweis bei neuen Sets                                                                              | 🔽 Low    | 📋 Geplant |
| **US-308** | **Fortschritt** <br> Als Nutzer möchte ich sehen, welche Karten ich bereits gesehen habe.          | • Markierung gesehener Karten <br> • Option zum Zurücksetzen                                          | 🔽 Low    | 📋 Geplant |

## Implementierungsstatus 📊

| Kategorie               | Fortschritt       | Epic/Story Referenz                                        |
| ----------------------- | ----------------- | ---------------------------------------------------------- |
| Einfache Kartenansicht  | 🟡 In Entwicklung | [Epic-2 Story-1](../.ai/stories/epic-2/story-1.md)         |
| Grundlegende Navigation | 🟡 In Entwicklung | [Epic-2 Story-2](../.ai/stories/epic-2/story-2.md)         |
| Kategoriefilter         | 🟡 In Entwicklung | [Epic-2 Story-3](../.ai/stories/epic-2/story-3.md)         |
| Externe Kartensets      | 📋 Geplant        | [Epic-4 Story-1](../.ai/stories/epic-4/story-1.md)         |
| User Onboarding         | 📋 Geplant        | [Epic-1 Story-1](../.ai/stories/epic-1/story-1.md)         |
| Favorites System        | 📋 Geplant        | [Epic-3 Story-2](../.ai/stories/epic-3/story-2.md)         |
| Theme System            | ✅ Fertig         | Refaktoriertes System mit klarer Struktur und Organisation |

> **Hinweis**: Der Fokus liegt auf der erfolgreichen Implementierung der MVP-Funktionalität.
> Zukünftige Erweiterungen werden erst nach Fertigstellung des MVP in Angriff genommen.
>
> Detaillierte Implementierungsinformationen zu jeder Story sind in den jeweiligen Dokumenten im `.ai/stories/` Verzeichnis zu finden.
