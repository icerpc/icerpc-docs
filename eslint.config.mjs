import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'utils/prism-*.js']
  },
  js.configs.recommended,
  {
    plugins: { '@typescript-eslint': tseslint, prettier },
    languageOptions: {
      parser: tsparser,
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
];
