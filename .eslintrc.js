module.exports = {
  root: true,

  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],

  plugins: [
    '@typescript-eslint',
    'jsdoc',
  ],

  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },

  // add your custom rules here
  rules: {
    'no-plusplus': 'off',
    'max-len': 'off',
    camelcase: 'off',
    'no-use-before-define': 'off',

    'no-param-reassign': 'off',
    'no-void': 'off',
    'no-nested-ternary': 'off',
    'max-classes-per-file': 'off',

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'prefer-promise-reject-errors': 'off',

    quotes: ['error', 'single', { avoidEscape: true }],

    // this rule, if on, would require explicit return type on the `render` function
    '@typescript-eslint/explicit-function-return-type': 'off',

    // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
    '@typescript-eslint/no-var-requires': 'off',

    // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
    // does not work with type definitions
    'no-unused-vars': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    semi: ['error', 'never'],
    'arrow-body-style': 'off',
    'func-call-spacing': 'off',
    'no-spaced-func': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-console': 'off',
    'no-alert': 'off',
    'no-underscore-dangle': 'off',

    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    '@typescript-eslint/consistent-type-imports': 'error',
    'class-methods-use-this': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
}
