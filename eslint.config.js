import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      
      // React specific rules
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'warn',
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'react/jsx-uses-vars': 'error',
      
      // General rules
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      
      // React refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
