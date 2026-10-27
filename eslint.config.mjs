import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig(
  {
    // Claude Code worktrees are full checkouts of this repo.
    ignores: ['.claude/**']
  },
  ...nextVitals,
  ...nextTypescript,
  eslintConfigPrettier
);
