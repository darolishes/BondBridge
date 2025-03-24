import React, { createContext, useContext } from 'react';
import appConfig from '@config';

/**
 * Config context type
 * Uses the app configuration object type
 */
type ConfigContextType = typeof appConfig;

/**
 * Create the config context with default configuration
 */
const ConfigContext = createContext<ConfigContextType>(appConfig);

/**
 * Props for the ConfigProvider component
 */
interface ConfigProviderProps {
  /**
   * Child components that will have access to the config
   */
  children: React.ReactNode;

  /**
   * Optional custom configuration to override defaults
   */
  config?: Partial<ConfigContextType>;
}

/**
 * ConfigProvider component for providing configuration to the application
 *
 * This component should be placed near the root of the application
 * to make configuration accessible to all child components.
 *
 * @example
 * ```tsx
 * <ConfigProvider>
 *   <App />
 * </ConfigProvider>
 * ```
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, config = {} }) => {
  // Merge custom config with default config
  const mergedConfig = {
    ...appConfig,
    ...config,
  };

  return <ConfigContext.Provider value={mergedConfig}>{children}</ConfigContext.Provider>;
};

/**
 * Hook for accessing the application configuration
 *
 * @returns The application configuration object
 *
 * @example
 * ```tsx
 * const config = useConfig();
 * console.log(config.app.VERSION);
 * ```
 */
export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  return context;
};

export default ConfigProvider;
