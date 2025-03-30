# Import Refactoring Plan

## Phase 1: Theme & Store (Hohe Priorität)

### Theme-System

- [ ] Ersetze "../../../theme" mit "@theme"
- [ ] Ersetze "../../../theme/types" mit "@theme/types"
- Dateien:
  - src/features/conversation-cards/components/PerformanceOverlay.tsx
  - src/features/conversation-cards/components/CardSetUploader.tsx
  - src/features/conversation-cards/components/CardSetManager.tsx

### Store

- [ ] Ersetze "../../../store" mit "@store"
- [ ] Aktualisiere Slice-Imports auf "@store/slices/\*"
- Dateien:
  - src/features/conversation-cards/hooks/useCardSetUpload.ts
  - src/features/conversation-cards/hooks/useCards.ts
  - src/features/conversation-cards/hooks/useCardFilters.ts
  - src/features/conversation-cards/hooks/useCardSets.ts

## Phase 2: Feature-spezifische Imports (Medium Priorität)

### Komponenten

- [ ] Ersetze relative Pfade mit "@cards/components"
- Dateien:
  - src/features/conversation-cards/components/Card.tsx
  - src/features/conversation-cards/screens/CardScreen.tsx

### Types

- [ ] Ersetze "../types" mit "@cards/types"
- Dateien:
  - src/features/conversation-cards/components/Card.tsx
  - src/features/conversation-cards/components/CategoryBadge.tsx
  - src/features/conversation-cards/hooks/useCards.ts

### Hooks

- [ ] Ersetze "../hooks" mit "@cards/hooks"
- Dateien:
  - src/features/conversation-cards/components/SwipeHandler.tsx
  - src/features/conversation-cards/screens/CardScreen.tsx

## Phase 3: Services & Utils (Niedrige Priorität)

### Services

- [ ] Ersetze relative Pfade mit "@cards/services"
- Dateien:
  - src/features/conversation-cards/services/cardsets/\*.ts
  - src/features/conversation-cards/services/CardSetService.ts

### Utils

- [ ] Ersetze relative Pfade mit "@cards/utils"
- Dateien:
  - src/features/conversation-cards/utils/cardSetTransform.ts
  - src/features/conversation-cards/utils/styleConverter.ts

## Validierung

1. Build-Tests

   - [ ] TypeScript-Kompilierung
   - [ ] Babel-Transpilierung
   - [ ] ESLint-Prüfung

2. Runtime-Tests
   - [ ] Unit-Tests ausführen
   - [ ] E2E-Tests ausführen
   - [ ] Manuelle Funktionsprüfung

## Rollout-Strategie

1. Schrittweise Implementierung

   - Änderungen pro Komponente
   - Sofortige Tests nach jeder Änderung
   - Git-Commit pro abgeschlossener Phase

2. Fehlerbehandlung

   - Backup der Original-Imports
   - Rollback-Plan bei Problemen
   - Dokumentation aller Änderungen

3. Performance-Monitoring
   - Build-Zeiten vor/nach
   - Bundle-Größe vor/nach
   - Import-Auflösungszeiten
