module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    //
    // COMMON JS/TS RULES
    'import/no-cycle': 'off',
    'linebreak-style': 'off',
    'new-cap': 'off',
    'import/extensions': 'off',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',

    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    //
    // IMPORT RULES
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',

    //
    // REACT SPECIFIC RULES

    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'warn',
    'react/jsx-no-target-blank': 'off',
    'react/no-array-index-key': 'warn',
    'react/sort-comp': 'off',
    'react/prop-types': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/button-has-type': 'off',
    'react/function-component-definition': 'off',

    //
    // JSX SPECIFIC RULES
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'warn', // пока пусть будет ворнинг, но надо искоренять
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/react-in-jsx-scope': 'off',

    //
    // HOOKS SPECIFIC RULES
    'react-hooks/exhaustive-deps': 'off',

    //
    // ACCESSABILITY RULES
    'jsx-a11y/anchor-is-valid': ['error', { aspects: ['noHref'] }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        directory: './',
      },
    },
  },
};
