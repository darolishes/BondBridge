# BondBridge Todo-Tracking Guide

## Übersicht

Dieses Dokument erklärt, wie du die `todo.md`-Datei für das BondBridge-Projekt verwenden kannst, um den Fortschritt zu verfolgen und mit KI-Assistenten zusammenzuarbeiten.

## Einrichtung für neue Chats

Um die todo.md in einem neuen Chat mit dem KI-Assistenten effektiv zu nutzen:

1. **Anhängen der Datei**: Füge die `todo.md`-Datei an deinen Chat an oder teile den Pfad mit dem Assistenten:

   ```
   /pfad/zu/BondBridge/todo.md
   ```

2. **Kontext etablieren**: Teile dem Assistenten mit, dass du die Todo-Datei verwenden möchtest:

   ```
   Bitte nutze die todo.md-Datei, um den Projektfortschritt zu verfolgen und Aufgaben zu aktualisieren.
   ```

3. **Regel referenzieren**: Verweise auf die Cursor-Regel für konsistente Verwendung:
   ```
   Bitte befolge die Anweisungen in der Regel .cursor/rules/003-todo-tracking.mdc
   ```

## Häufige Anwendungsfälle

### Fortschritt aktualisieren

```
Bitte aktualisiere den Status der Story "[US-101] Einfache Card-Komponente" auf "In Bearbeitung" und setze den Fortschritt des übergeordneten Epics entsprechend.
```

### Neue Aufgabe hinzufügen

```
Bitte füge unter dem Epic "Conversation Cards (MVP)" eine neue Task zur Story "[US-102] Grundlegende Navigation" hinzu: "Animationen für Übergänge implementieren" mit Status "Todo".
```

### Fortschrittsübersicht abfragen

```
Gib mir eine Zusammenfassung des aktuellen MVP-Fortschritts basierend auf der todo.md.
```

### Mit memory-bank verknüpfen

```
Bitte aktualisiere die todo.md mit den neuesten Informationen aus der memory-bank/userStories.md und memory-bank/implementationPlan.md.
```

## Best Practices

1. **Konsistente Emoji-Nutzung**: Nutze nur die in der Legende definierten Emojis für Status.

2. **Hierarchische Updates**: Bei Statusänderungen immer sowohl die Tasks als auch die übergeordneten Stories und Epics aktualisieren.

3. **Regelmäßige Aktualisierung**: Halte die todo.md aktuell, damit sie einen genauen Überblick über den Projektfortschritt bietet.

4. **Memory-Bank-Referenzen**: Nutze Verweise auf die entsprechenden Dokumente in der memory-bank für vollständigen Kontext.

5. **MVP-Fokus**: Priorisiere MVP-Aufgaben und halte Post-MVP-Features klar getrennt.

## Fehlerbehebung

Bei Problemen mit dem Todo-Tracking:

- Überprüfe, ob die Dateistruktur der todo.md unverändert bleibt
- Stelle sicher, dass alle Statusänderungen mit den korrekten Emojis vorgenommen wurden
- Aktualisiere die Fortschritts-Prozentsätze bei Statusänderungen

---

Bei Fragen zur Verwendung der todo.md wende dich an das Entwicklungsteam oder konsultiere die Regel unter `.cursor/rules/003-todo-tracking.mdc`.
