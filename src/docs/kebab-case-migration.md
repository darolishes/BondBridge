# Kebab-Case Migrationsleitfaden

## Aktualisierte Namenskonventionen (v2.1)

### Komponentendateien

```diff
- src/components/common/ProgressBar.tsx
+ src/components/common/progress-bar.tsx

- src/components/card/Card.tsx
+ src/components/card/card/
   ├── card-container.tsx
   ├── card-presentation.tsx
   └── index.ts
```

### Hook-Dateien

```diff
- src/hooks/useCardFlip.ts
+ src/hooks/use-card-flip.ts
```

### Testdateien

```diff
- src/components/__tests__/Card.test.tsx
+ src/components/__tests__/card.test.tsx
```

## Migrationsstatus

| Komponente  | Status  | Letzte Aktualisierung |
| ----------- | ------- | --------------------- |
| ProgressBar | ✅ Done | 24.03.2025            |
| Card        | 🚧 WIP  | 24.03.2025            |
| ThemeToggle | ⏳ Next | -                     |

## Automatisierung

```bash
# Rename script (Beispiel)
find src -name '*[A-Z]*.tsx' -exec sh -c 'echo "${0%.tsx}${0##*[A-Z]}"' {} \;
```
