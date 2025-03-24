import { z } from 'zod';
import { AppConfig, ConfigSchema } from './schema';
import { envConfig } from '@env/env-config';
import { themeConfig } from '@theme/theme-config';
import { constantsConfig } from '@constants/constants-config';
import { pathsConfig } from '@paths/paths-config';

class ConfigRegistry {
  private static instance: ConfigRegistry;
  private config: AppConfig;

  private constructor() {
    // Initial Konfiguration laden
    const initialConfig = {
      env: envConfig,
      theme: themeConfig,
      constants: constantsConfig,
      paths: pathsConfig,
    };

    // Konfiguration validieren
    try {
      this.config = ConfigSchema.parse(initialConfig);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Konfigurationsfehler:', error.errors);
      }
      throw new Error('Ungültige Konfiguration');
    }
  }

  public static getInstance(): ConfigRegistry {
    if (!ConfigRegistry.instance) {
      ConfigRegistry.instance = new ConfigRegistry();
    }
    return ConfigRegistry.instance;
  }

  // Getter für verschiedene Konfigurationsbereiche
  public get env() {
    return this.config.env;
  }

  public get theme() {
    return this.config.theme;
  }

  public get constants() {
    return this.config.constants;
  }

  public get paths() {
    return this.config.paths;
  }

  // Methode zum Aktualisieren von Konfigurationswerten
  public update<K extends keyof AppConfig>(section: K, updates: Partial<AppConfig[K]>): void {
    const updatedConfig = {
      ...this.config,
      [section]: {
        ...this.config[section],
        ...updates,
      },
    };

    // Validiere die aktualisierte Konfiguration
    try {
      this.config = ConfigSchema.parse(updatedConfig);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Konfigurationsaktualisierungsfehler:', error.errors);
      }
      throw new Error('Ungültige Konfigurationsaktualisierung');
    }
  }

  // Methode zum Zurücksetzen auf Standardwerte
  public reset(section?: keyof AppConfig): void {
    if (section) {
      // Einzelnen Bereich zurücksetzen
      const defaultConfig = new ConfigRegistry().config;
      this.update(section, defaultConfig[section]);
    } else {
      // Gesamte Konfiguration zurücksetzen
      ConfigRegistry.instance = new ConfigRegistry();
    }
  }

  // Methode zum Exportieren der Konfiguration
  public export(): AppConfig {
    return { ...this.config };
  }
}

// Exportiere eine Singleton-Instanz
export const configRegistry = ConfigRegistry.getInstance();

// Exportiere einen Hook für React-Komponenten
export const useConfig = () => {
  return {
    config: configRegistry.export(),
    updateConfig: <K extends keyof AppConfig>(section: K, updates: Partial<AppConfig[K]>) =>
      configRegistry.update(section, updates),
    resetConfig: (section?: keyof AppConfig) => configRegistry.reset(section),
  };
};
