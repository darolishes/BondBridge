import { PathConfig } from '../core/schema';
import path from 'path';

// Projekt-Wurzelverzeichnis
const projectRoot = path.resolve(__dirname, '../..');

export const pathsConfig: PathConfig = {
  components: path.resolve(projectRoot, 'src/components'),
  screens: path.resolve(projectRoot, 'src/screens'),
  utils: path.resolve(projectRoot, 'src/utils'),
  hooks: path.resolve(projectRoot, 'src/hooks'),
  theme: path.resolve(projectRoot, 'src/theme'),
  types: path.resolve(projectRoot, 'src/types'),
  assets: path.resolve(projectRoot, 'assets'),
};

// Pfad-Utility-Funktionen
export const getPath = (pathKey: keyof PathConfig) => {
  return pathsConfig[pathKey];
};

export const resolveProjectPath = (...segments: string[]) => {
  return path.resolve(projectRoot, ...segments);
};

// Alias-Mapping für Build-Konfigurationen
export const getAliasConfig = () => {
  return Object.entries(pathsConfig).reduce(
    (aliases, [key, value]) => ({
      ...aliases,
      [`@${key}`]: value,
    }),
    {} as Record<string, string>
  );
};

// Validiere Pfade
export const validatePaths = () => {
  const fs = require('fs');
  const invalidPaths = Object.entries(pathsConfig).filter(([key, value]) => {
    try {
      return !fs.existsSync(value);
    } catch (error) {
      console.error(`Fehler beim Überprüfen des Pfads ${key}:`, error);
      return true;
    }
  });

  if (invalidPaths.length > 0) {
    console.warn(
      'Warnung: Folgende Pfade existieren nicht:',
      invalidPaths.map(([key]) => key)
    );
  }

  return invalidPaths.length === 0;
};

export default pathsConfig;
