import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'utils/prism-*.js']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // TODO: Enable type-checked rules once ready to fix the. Also maybe just use strict, it contains recommended
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  // tseslint.configs.strict,
  {
    plugins: { prettier },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
      // parserOptions: {
      //   projectService: true
      // }
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
