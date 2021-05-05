module.exports = {
  extends: [
    'plugin:jest/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'react/prop-types': 'off',
    'import/no-cycle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'global-require': 'off',
    'react/no-unused-prop-types': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-debugger': 'off',
  },
};
