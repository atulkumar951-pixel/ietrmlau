import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Queuing a state reset directly inside an effect (e.g. clearing
      // counters when the user logs out) is intentional here; the strict
      // v7 rule flags it, so keep it advisory.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  // Backend runs in Node, not the browser: it needs Node globals
  // (process, console, Buffer...) and tolerates unused caught errors
  // in defensive catch blocks.
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_',
        caughtErrors: 'none',
      }],
    },
  },
  // Context files legitimately export a provider component plus its
  // hook, which the fast-refresh rule flags; keep it advisory there.
  {
    files: ['src/context/**'],
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
  },
])
