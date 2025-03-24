/**
 * Path aliases configuration
 * This is the single source of truth for path aliases used in the application.
 * Both babel.config.js and tsconfig.json should reference these aliases.
 */

interface PathAliases {
  [key: string]: string;
}

/**
 * Path aliases for the application
 * Used in babel.config.js and tsconfig.json
 */
export const pathAliases: PathAliases = {
  '@': './src',
  '@components': './src/components',
  '@screens': './src/screens',
  '@utils': './src/utils',
  '@hooks': './src/hooks',
  '@theme': './src/theme',
  '@types': './src/types',
  '@assets': './assets',
  '@constants': './src/constants',
  '@services': './src/services',
  '@contexts': './src/contexts',
  '@navigation': './src/navigation',
  '@i18n': './src/i18n',
  '@config': './config',
};

/**
 * Convert path aliases to TypeScript compiler paths format
 * Used in tsconfig.json
 */
export const getTypeScriptPaths = (): { [key: string]: string[] } => {
  const typescriptPaths: { [key: string]: string[] } = {};

  Object.entries(pathAliases).forEach(([alias, path]) => {
    // TypeScript paths need to have the format: "@alias/*": ["path/*"]
    typescriptPaths[`${alias}/*`] = [`${path}/*`];

    // For direct imports like @types with no subpath
    if (alias === '@types') {
      typescriptPaths[alias] = [path];
    }
  });

  return typescriptPaths;
};

/**
 * Get babel module resolver format for the path aliases
 * Used in babel.config.js
 */
export const getBabelAliases = (): PathAliases => pathAliases;

export default pathAliases;
