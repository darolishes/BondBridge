# Kebab-Case Migration Plan

## Übersicht

Dieses Dokument beschreibt den Plan zur Migration der Dateibenennung auf kebab-case im BondBridge-Projekt.

## Umzubenennende Dateien

### Utils

- `animationUtils.ts` → `animation-utils.ts`
- `styleUtils.ts` → `style-utils.ts`
- `accessibility.ts` (bereits kebab-case)
- `storage.ts` (bereits kebab-case)

### Services

- `imageService.ts` → `image-service.ts`
- `importService.ts` → `import-service.ts`
- `validation.ts` (bereits kebab-case)

### Hooks

- `useCardFlip.ts` → `use-card-flip.ts`
- `useCardSets.ts` → `use-card-sets.ts`
- `useCardSwipe.ts` → `use-card-swipe.ts`
- `useHapticFeedback.ts` → `use-haptic-feedback.ts`

### Components

#### Card Components

- `Card.tsx` → `card.tsx`
- `CardSetImageGrid.tsx` → `card-set-image-grid.tsx`
- `CardSetTile.tsx` → `card-set-tile.tsx`

#### Common Components

- `Button.tsx` → `button.tsx`
- `EmptyState.tsx` → `empty-state.tsx`
- `ErrorBoundary.tsx` → `error-boundary.tsx`
- `ImageWithPlaceholder.tsx` → `image-with-placeholder.tsx`
- `ProgressBar.tsx` → `progress-bar.tsx`
- `SkeletonLoader.tsx` → `skeleton-loader.tsx`
- `ThemeToggle.tsx` → `theme-toggle.tsx`
- `Toast.tsx` → `toast.tsx`

### Screens

- `CardViewScreen.tsx` → `card-view-screen.tsx`
- `ImportModal.tsx` → `import-modal.tsx`
- `SettingsScreen.tsx` → `settings-screen.tsx`

## Migrationsschritte

1. Utils und Services (Basis-Layer)

   - Dateien umbenennen
   - Import-Statements aktualisieren
   - Tests anpassen

2. Hooks (abhängig von Utils/Services)

   - Dateien umbenennen
   - Import-Statements aktualisieren
   - Tests anpassen

3. Komponenten (abhängig von Hooks)

   - Mit Base-Komponenten beginnen
   - Dann Card-Komponenten
   - Zuletzt Layout und Settings
   - Story- und Test-Dateien parallel aktualisieren

4. Screens (Top-Layer)
   - Screen-Dateien umbenennen
   - Import-Pfade aktualisieren
   - Tests anpassen

## Import-Statement Updates

Beispiel für Import-Updates:

```typescript
// Alt
import { useFadeAnimation } from '@utils/animationUtils';

// Neu
import { useFadeAnimation } from '@utils/animation-utils';
```

## Qualitätssicherung

1. Jest-Tests nach jeder Änderung ausführen
2. Storybook-Stories überprüfen
3. Manuelle Tests der Hauptfunktionalitäten
4. TypeScript-Kompilierung verifizieren

## Rollback-Plan

1. Git-Branch für die Migration erstellen
2. Commits pro Komponenten-Gruppe
3. Backup der kritischen Dateien
4. Dokumentation aller Änderungen

## Timeline

1. Tag 1: Utils und Services
2. Tag 2: Hooks und Tests
3. Tag 3-4: Komponenten und Stories
4. Tag 5: Screens und finale Tests

## Nächste Schritte

1. In den Code-Modus wechseln
2. Mit Utils-Migration beginnen
3. Continuous Integration sicherstellen
4. Regelmäßige Test-Durchläufe
