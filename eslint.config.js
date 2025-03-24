import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from 'eslint-plugin-react-native';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

// Base configuration for all JavaScript files
const baseConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    'no-console': 'off',
    'no-undef': 'off', // TypeScript handles this
  },
};

// Configuration for TypeScript files
const typeScriptConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    // Allow unused values in interfaces, types, and enums
    'no-unused-vars': 'off',
  },
};

// Configuration for React files
const reactConfig = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React specific rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',

    // React hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

// Configuration for React Native files
const reactNativeConfig = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    'react-native': reactNativePlugin,
  },
  rules: {
    // React Native specific rules
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn', // Just warn for now
    'react-native/no-color-literals': 'off',
    'react-native/sort-styles': 'off',
    'react-native/no-raw-text': [
      'error',
      {
        skip: ['Button', 'Text'],
      },
    ],
  },
};

// Configuration for script files (outside src)
const scriptConfig = {
  files: ['scripts/**/*.js'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    'no-undef': 'off', // Allow global Node.js objects
    'no-console': 'off', // Allow console in scripts
  },
};

// Configuration for test files
const testConfig = {
  files: ['**/*.{spec,test}.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
  plugins: {
    jest: jestPlugin,
  },
  rules: {
    // Jest specific rules
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',

    // Rules to relax in test files
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};

// Files and directories to ignore
const ignoresConfig = {
  ignores: [
    'node_modules/',
    '.expo/',
    'dist/',
    'build/',
    'coverage/',
    '*.config.js', // Exclude config files except this one
    '*.config.mjs',
    'src/.expo/',
    'src/src/',
    '.eslintrc.js',
  ],
};

// Export configurations
export default [
  js.configs.recommended,
  baseConfig,
  typeScriptConfig,
  reactConfig,
  reactNativeConfig,
  scriptConfig,
  testConfig,
  ignoresConfig,
];
