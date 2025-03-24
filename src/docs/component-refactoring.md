# Komponenten-Refactoring-Leitfaden

## Container/Presentational Pattern

### Struktur

```
card/              # Beispiel für Card-Komponente
├── container.tsx  # Container/Smart Component
├── presentation.tsx # Presentational/Dumb Component
├── styles.ts     # Styling
├── types.ts      # TypeScript Definitionen
└── index.ts      # Öffentliche API
```

### Beispiel-Implementation

Die Card-Komponente wurde als Referenzimplementierung refaktoriert:

1. **Types (types.ts)**

   ```typescript
   // Basis-Props Definition
   interface BaseProps {
     // Gemeinsame Props
   }

   // Spezifische Props Varianten
   interface VariantAProps extends BaseProps {
     // Zusätzliche Props
   }
   ```

2. **Styles (styles.ts)**

   ```typescript
   export const styles = StyleSheet.create({
     // Zentrale Styles
   });

   export const createStyles = config =>
     StyleSheet.create({
       // Dynamische Styles
     });
   ```

3. **Presentation (presentation.tsx)**

   ```typescript
   interface PresentationProps {
     // UI-spezifische Props
   }

   export const Presentation: React.FC<PresentationProps> = {
     // Reine Rendering-Logik
   };
   ```

4. **Container (container.tsx)**

   ```typescript
   const Container: React.FC<Props> = props => {
     // Hooks
     // Business Logic
     // Event Handler
     return <Presentation {...presentationProps} />;
   };
   ```

5. **Index (index.ts)**
   ```typescript
   export { default } from './container';
   export * from './types';
   ```

## Best Practices

1. **Trennung der Verantwortlichkeiten**

   - Container: Business-Logik, State, Event-Handling
   - Presentation: Nur UI-Rendering
   - Types: Klare Schnittstellen-Definition
   - Styles: Wiederverwendbare Styling-Logik

2. **Namenskonventionen**

   - Kebab-Case für Ordner
   - Generische Dateinamen (container.tsx, presentation.tsx)
   - PascalCase für Komponenten
   - camelCase für Funktionen/Props

3. **Code-Organisation**

   - Flache Struktur im Komponenten-Ordner
   - Ein Export pro Datei
   - Klare Typ-Definitionen
   - Dokumentierte Props

4. **Performance**
   - Memo für Container
   - Callback-Optimierung
   - Style-Extraktion

## Migration checklist

- [ ] Types extrahieren
- [ ] Styles zentralisieren
- [ ] UI-Logik isolieren
- [ ] Business-Logik kapseln
- [ ] Tests anpassen
- [ ] Dokumentation aktualisieren
- [ ] Breaking Changes dokumentieren

## Beispiel-Migration

Siehe Card-Komponente als Referenzimplementierung:

- `/src/components/card/*`
