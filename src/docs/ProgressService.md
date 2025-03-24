# Progress Service Spezifikation

## Typdefinitionen

```typescript
// src/types/progress.ts
export interface SetProgress {
  setId: string;
  seenCards: string[]; // Array von Karten-IDs
  lastViewedAt: number; // Timestamp
}

export interface ProgressStats {
  totalCards: number;
  seenCards: number;
  progressPercentage: number;
  categoryProgress: Record<
    string,
    {
      total: number;
      seen: number;
      percentage: number;
    }
  >;
}
```

## Service Interface

```typescript
// src/services/progressService.ts
export interface ProgressService {
  // Speichert den Fortschritt für eine gesehene Karte
  markCardAsSeen(setId: string, cardId: string): Promise<void>;

  // Lädt den Fortschritt für ein Set
  getSetProgress(setId: string): Promise<SetProgress | null>;

  // Berechnet Statistiken für ein Set
  getProgressStats(setId: string): Promise<ProgressStats>;

  // Löscht den Fortschritt für ein Set
  resetProgress(setId: string): Promise<void>;

  // Lädt den Fortschritt für alle Sets
  getAllSetsProgress(): Promise<SetProgress[]>;
}
```

## Implementation Details

### Storage Keys

- Format: `bondbridge_progress_${setId}`
- Beispiel: `bondbridge_progress_basic-set`

### AsyncStorage Operationen

```typescript
// Speichern
await AsyncStorage.setItem(
  `bondbridge_progress_${setId}`,
  JSON.stringify({
    setId,
    seenCards: [...existingProgress.seenCards, cardId],
    lastViewedAt: Date.now(),
  })
);

// Laden
const data = await AsyncStorage.getItem(`bondbridge_progress_${setId}`);
```

### Fehlerbehandlung

1. **Storage Fehler**

   - Versuche Operation bis zu 3 Mal
   - Fallback auf leeren Fortschritt
   - Logge Fehler für Debugging

2. **Datenvalidierung**
   - Prüfe JSON-Struktur
   - Validiere Karten-IDs
   - Stelle Datenintegrität sicher

### Performance Optimierung

1. **Caching**

   - In-Memory Cache für häufig genutzte Sets
   - Cache-Invalidierung nach 5 Minuten
   - LRU Cache-Strategie

2. **Batch Updates**
   - Sammle Updates für 500ms
   - Führe gebündelte Schreiboperationen durch
   - Vermeide häufige Storage-Zugriffe

## Test Strategie

### Unit Tests

```typescript
describe('ProgressService', () => {
  it('should mark card as seen', async () => {
    // Setup
    const service = new ProgressService();
    const setId = 'test-set';
    const cardId = 'card-1';

    // Execute
    await service.markCardAsSeen(setId, cardId);

    // Verify
    const progress = await service.getSetProgress(setId);
    expect(progress.seenCards).toContain(cardId);
  });

  it('should calculate correct statistics', async () => {
    // Setup
    const service = new ProgressService();
    const setId = 'test-set';

    // Execute
    const stats = await service.getProgressStats(setId);

    // Verify
    expect(stats.progressPercentage).toBeDefined();
    expect(stats.categoryProgress).toBeDefined();
  });
});
```

## Migration Strategie

1. **Datenformat-Updates**

   - Versionierung des Storage-Formats
   - Migration beim App-Start
   - Backup vor Migration

2. **Backwards Compatibility**
   - Unterstützung für alte Formate
   - Graceful Degradation
   - Benutzerbenachrichtigungen

## Sicherheitsüberlegungen

1. **Datenschutz**

   - Keine persönlichen Daten im Fortschritt
   - Lokale Speicherung only
   - Verschlüsselung optional

2. **Datenintegrität**
   - Checksums für Storage-Daten
   - Validierung beim Laden
   - Automatische Reparatur

## Monitoring & Debugging

1. **Logging**

   - Performance-Metriken
   - Fehlerrate
   - Storage-Nutzung

2. **Debug-Utilities**
   - Fortschritt-Reset Funktion
   - Storage-Inspektor
   - Testdaten-Generator
