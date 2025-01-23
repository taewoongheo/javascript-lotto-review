import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import eslintConfigPrettier from 'eslint-config-prettier';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  pluginJs.configs.recommended,
  ...compat.extends('airbnb-base'),
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 'latest',
    },
    rules: {
      'import/extensions': ['error', 'ignorePackages'],
      'class-methods-use-this': 'off',
      'no-return-await': 'off',
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'no-underscore-dangle': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
