/**
 * ESLint設定ファイル
 */

import globals from 'globals';
import eslint from '@eslint/js';
import nextConfig from 'eslint-config-next';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import storybookPlugin from 'eslint-plugin-storybook';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // グローバル除外設定
  {
    ignores: [
      '**/.next/',
      '**/dist/',
      '**/build/',
      '**/out/',
      '**/tsconfig.json',
      '**/next-env.d.ts',
      '**/scripts/',
      '**/*.min.js',
      '**/coverage/',
      '*.config.{mjs,mts}',
      '.lintstagedrc.mjs',
      '**/.storybook/main.ts',
      '**/.storybook/preview.ts',
      '**/.storybook/vitest.setup.ts',
      'package.json',
      'src/api-generated/**/*.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      ...eslint.configs.recommended.plugins,
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslint.configs.recommended.rules,
    },
  },
  ...tseslint.configs.recommended,
  ...nextConfig,
  ...storybookPlugin.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@next/next/no-img-element': 'off',
      'no-empty-pattern': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
        },
      ],
      // JSX属性で不要な波括弧を削除（文字列リテラルの場合）
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'react/jsx-boolean-value': 'error',
    },
  },
  {
    files: ['**/*.tsx'],
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/no-unregistered-classes': 'warn',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
        order: 'official',
      },
    },
  },
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // eslintConfigPrettier,
];
