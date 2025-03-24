# Konfigurationsarchitektur

## Aktuelle Struktur

Die Konfiguration ist derzeit über mehrere Dateien verteilt:

```tree
/
├── config/                      # Zentraler Konfigurationsordner
│   ├── constants.ts            # App-Konstanten
│   ├── paths.ts               # Pfad-Aliase
│   ├── theme.ts               # Theme-Konfiguration
│   ├── index.ts               # Hauptexport
│   ├── eslint/               # ESLint-Konfiguration
│   │   └── eslint-config.ts
│   ├── babel/                # Babel-Konfiguration
│   │   └── babel-config.ts
│   ├── metro/               # Metro-Konfiguration
│   │   └── metro-config.ts
│   ├── webpack/             # Webpack-Konfiguration
│   │   └── webpack-config.ts
│   └── env/                 # Umgebungsvariablen
│       └── env-config.ts
├── .env                     # Temporäre Umgebungsvariablen
├── eslint.config.js         # Root ESLint (wird migriert)
├── babel.config.js          # Root Babel (wird migriert)
├── metro.config.js          # Root Metro (wird migriert)
└── webpack.config.js        # Root Webpack (wird migriert)
```

## Migrationsplan

### 1. Konfigurationsdateien Konsolidierung

- [x] Basiskonfigurationsstruktur in /config etabliert
- [ ] Root-Konfigurationsdateien in den config-Ordner migrieren
  - [ ] ESLint-Konfiguration
  - [ ] Babel-Konfiguration
  - [ ] Metro-Konfiguration
  - [ ] Webpack-Konfiguration
  - [ ] App.json
  - [ ] .env

### 2. ConfigContext Verbesserungen

Der ConfigContext (src/contexts/ConfigContext) wurde mit folgenden Features implementiert:

- [x] Grundlegende Konfigurationsstruktur
- [x] Theme-Integration
- [x] Komponenten-spezifische Konfiguration
- [x] Runtime-Konfigurationsupdates

### 3. Best Practices

- Zentrale Konfigurationsverwaltung in /config
- Strikte Typisierung für alle Konfigurationsobjekte
- Validierung von Konfigurationswerten
- Dokumentierte Konfigurationsschnittstelle
- Versionskontrolle für Konfigurationsänderungen

## Import-Schema

```typescript
// Empfohlene Import-Struktur
import { config } from '@config';
import { useConfig } from '@contexts/ConfigContext';
```

## Konfigurationszugriff

```typescript
// Komponenten-Beispiel
const MyComponent = () => {
  const { config, updateConfig } = useConfig();

  return <div style={config.theme.colors}>{config.app.NAME}</div>;
};
```

## ConfigContext Implementierung

Der ConfigContext ist als React Context implementiert und bietet folgende Kernfunktionalitäten:

### Provider

```typescript
const ConfigProvider: React.FC<{
  config: Partial<Config>;
  children: React.ReactNode;
}>;
```

Der Provider initialisiert die Konfiguration mit Standardwerten und ermöglicht das Überschreiben durch props:

- Basis-App-Konfiguration (NAME, SLUG, VERSION, SCHEME)
- Komponenten-spezifische Einstellungen
- Theme und Styling

### Hook

```typescript
const useConfig = () => ConfigContextType;
```

Der `useConfig` Hook stellt zwei Hauptfunktionen bereit:

- `config`: Aktueller Konfigurationszustand
- `updateConfig`: Methode zum Aktualisieren der Konfiguration

## Typdefinitionen

Die Konfiguration verwendet strikte TypeScript-Definitionen:

```typescript
interface Config {
  app: {
    NAME: string;
    SLUG: string;
    VERSION: string;
    SCHEME: string;
  };
  components: {
    card: {
      dimensions: {
        width: string;
        margin: number;
      };
      animation: {
        flipDuration: number;
        swipeThreshold: number;
        rotationFactor: number;
      };
      style: {...};
    };
  };
}
```

## Konfigurationsvalidierung

Implementiere diese Validierungsfunktionen in `src/services/validation/config.ts`:

```typescript
export const validateConfig = (config: Partial<Config>): ValidationResult => {
  return {
    app: validateAppConfig(config.app),
    components: validateComponentsConfig(config.components),
  };
};

export const validateAppConfig = (app?: Partial<Config['app']>): ValidationResult => {
  if (!app?.NAME || typeof app.NAME !== 'string') {
    throw new Error('App NAME ist erforderlich und muss ein String sein');
  }
  // Weitere Validierungen...
};
```

## Detaillierte Migrationsschritte

### ESLint-Konfiguration

1. Erstelle `config/eslint/eslint-config.ts`:

```typescript
export const eslintConfig = {
  // Migrierte Konfiguration aus eslint.config.js
};
```

2. Aktualisiere `eslint.config.js`:

```javascript
import { eslintConfig } from './config/eslint/eslint-config.js';
export default eslintConfig;
```

### Babel-Konfiguration

1. Erstelle `config/babel/babel-config.ts`:

```typescript
export const babelConfig = {
  // Migrierte Konfiguration aus babel.config.js
};
```

2. Aktualisiere `babel.config.js`:

```javascript
import { babelConfig } from './config/babel/babel-config.js';
export default babelConfig;
```

### Metro-Konfiguration

1. Erstelle `config/metro/metro-config.ts`:

```typescript
export const metroConfig = {
  // Migrierte Konfiguration aus metro.config.js
};
```

2. Aktualisiere `metro.config.js`:

```javascript
import { metroConfig } from './config/metro/metro-config.js';
export default metroConfig;
```

### Webpack-Konfiguration

1. Erstelle `config/webpack/webpack-config.ts`:

```typescript
export const webpackConfig = {
  // Migrierte Konfiguration aus webpack.config.js
};
```

2. Aktualisiere `webpack.config.js`:

```javascript
import { webpackConfig } from './config/webpack/webpack-config.js';
export default webpackConfig;
```

### Umgebungsvariablen

1. Erstelle `config/env/env-config.ts`:

```typescript
import dotenv from 'dotenv';

// Typisierte Umgebungsvariablen
export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  API_URL: string;
  DEBUG_MODE?: boolean;
}

// Validierung der Umgebungsvariablen
export const validateEnvConfig = (env: any): env is EnvConfig => {
  if (!env.NODE_ENV || !['development', 'production', 'test'].includes(env.NODE_ENV)) {
    throw new Error('Ungültige NODE_ENV');
  }
  if (!env.API_URL || typeof env.API_URL !== 'string') {
    throw new Error('API_URL ist erforderlich');
  }
  return true;
};

export const loadEnvConfig = () => {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
  const env = result.parsed;
  if (!env || !validateEnvConfig(env)) {
    throw new Error('Ungültige Umgebungsvariablen');
  }
  return env;
};
```

2. Aktualisiere `.env`:

```env
NODE_ENV=development
API_URL=http://localhost:3000
DEBUG_MODE=true
```

## Beispiele für Konfigurationsaktualisierungen

### Theme-Aktualisierung

```typescript
const ThemeToggle = () => {
  const { config, updateConfig } = useConfig();

  const toggleTheme = () => {
    updateConfig({
      components: {
        card: {
          style: {
            loading: {
              backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
            },
          },
        },
      },
    });
  };
};
```

### Komponenten-Konfiguration

```typescript
const CardConfig = () => {
  const { config, updateConfig } = useConfig();

  const updateCardDimensions = (width: string) => {
    updateConfig({
      components: {
        card: {
          dimensions: {
            width,
          },
        },
      },
    });
  };
};
```

## Migration Checkliste

Für jede zu migrierende Konfigurationsdatei:

1. [ ] Typescript-Interface erstellen
2. [ ] Validierungsfunktionen implementieren
3. [ ] Konfiguration in /config migrieren
4. [ ] Tests für Validierung schreiben
5. [ ] Dokumentation aktualisieren
6. [ ] Root-Datei auf neue Konfiguration umstellen

## Fehlerbehebung

Häufige Probleme und Lösungen:

1. **Konfiguration nicht verfügbar**

   ```typescript
   // Stelle sicher, dass der Provider im Tree verfügbar ist
   const App = () => (
     <ConfigProvider config={initialConfig}>
       <YourApp />
     </ConfigProvider>
   );
   ```

2. **Typ-Fehler bei Updates**

   ```typescript
   // Verwende Partial für partielle Updates
   updateConfig({
     app: { NAME: 'NewName' }, // OK
   });
   ```

3. **Validierungsfehler**
   ```typescript
   // Implementiere try-catch für Validierung
   try {
     validateConfig(newConfig);
     updateConfig(newConfig);
   } catch (error) {
     console.error('Ungültige Konfiguration:', error);
   }
   ```
