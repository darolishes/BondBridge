import React, { createContext, useContext, useState } from 'react';
import { Config, ConfigContextType } from './types';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{
  config: Partial<Config>;
  children: React.ReactNode;
}> = ({ config: initialConfig, children }) => {
  const [config, setConfig] = useState<Config>({
    app: {
      NAME: 'BondBridge',
      SLUG: 'bondbridge',
      VERSION: '1.0.0',
      SCHEME: 'bondbridge',
    },
    components: {
      card: {
        dimensions: {
          width: '100%',
          margin: 8,
        },
        animation: {
          flipDuration: 300,
          swipeThreshold: 0.25,
          rotationFactor: 1.5,
        },
        style: {
          borderRadius: 16,
          elevation: 4,
          shadow: {
            color: '#000',
            offset: { width: 0, height: 2 },
            opacity: 0.1,
            radius: 4,
          },
          content: {
            padding: 20,
          },
          loading: {
            height: 100,
            backgroundColor: '#f0f0f0',
          },
        },
      },
    },
    ...initialConfig,
  });

  const updateConfig = (newConfig: Partial<Config>) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      ...newConfig,
    }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
