# Fortschrittsverfolgung für Kartensets

## Überblick

Implementation der Fortschrittsverfolgung für gesehene Karten pro Set und Kategorie, um Benutzern einen klaren Überblick über ihren Fortschritt zu geben.

## Ziele

- Tracking von gesehenen Karten pro Set
- Anzeige des Gesamtfortschritts pro Set
- Anzeige des Fortschritts pro Kategorie
- Persistente Speicherung des Fortschritts

## Technische Anforderungen

### Datenstruktur in AsyncStorage

```typescript
interface SetProgress {
  setId: string;
  seenCards: string[]; // Array von Karten-IDs
  lastViewedAt: number; // Timestamp
}

// Schlüsselformat: "bondbridge_progress_${setId}"
```

### Neue Komponenten

1. `ProgressBar.tsx` (bereits existiert)

   - Erweitern um Prozentanzeige
   - Verschiedene Stile für Set- vs. Kategoriefortschritt

2. `SetProgressHeader.tsx`

   - Zeigt Gesamtfortschritt für ein Set an
   - "X von Y Karten gesehen (Z%)"

3. `CategoryProgress.tsx`
   - Zeigt Fortschritt pro Kategorie
   - Filtert Karten nach Kategorie

### Neue Hooks

1. `useProgress.ts`

```typescript
interface UseProgressReturn {
  seenCards: string[];
  totalProgress: number;
  categoryProgress: Record<string, number>;
  markCardAsSeen: (cardId: string) => Promise<void>;
  resetProgress: (setId: string) => Promise<void>;
}
```

### Services

1. `progressService.ts`
   - CRUD-Operationen für Fortschrittsdaten
   - Berechnung von Statistiken
   - Synchronisation mit AsyncStorage

## Implementierungsschritte

1. progressService erstellen

   - AsyncStorage Operationen
   - Fortschrittsberechnungen
   - Fehlerbehandlung

2. useProgress Hook implementieren

   - Integration mit progressService
   - Reaktive Updates
   - Caching-Mechanismus

3. UI-Komponenten entwickeln

   - ProgressBar erweitern
   - SetProgressHeader erstellen
   - CategoryProgress erstellen

4. Integration in CardViewScreen

   - Fortschrittsanzeige einbinden
   - onViewableItemsChanged Handler für Tracking

5. Tests
   - Unit Tests für Services
   - Integration Tests für Hook
   - Komponenten Tests

## Akzeptanzkriterien

1. **Fortschrittsspeicherung**

   - [ ] Gesehene Karten werden korrekt in AsyncStorage gespeichert
   - [ ] Fortschritt bleibt nach App-Neustart erhalten
   - [ ] Mehrere Sets können parallel getrackt werden

2. **Fortschrittsanzeige**

   - [ ] Gesamtfortschritt wird korrekt angezeigt (X/Y Karten)
   - [ ] Kategoriefortschritt wird korrekt berechnet
   - [ ] ProgressBar zeigt visuellen Fortschritt

3. **Performance**

   - [ ] Keine spürbaren Verzögerungen beim Tracking
   - [ ] Effiziente AsyncStorage Nutzung
   - [ ] Optimiertes Re-Rendering

4. **Fehlerbehandlung**
   - [ ] Robuste Fehlerbehandlung bei AsyncStorage Fehlern
   - [ ] Fallback für nicht verfügbare Daten
   - [ ] Benutzerfreundliche Fehlermeldungen

## Definition of Done

- [ ] Alle Tests sind geschrieben und bestanden
- [ ] Code Review durchgeführt
- [ ] Dokumentation aktualisiert
- [ ] Performance-Tests durchgeführt
- [ ] Keine bekannten Bugs
