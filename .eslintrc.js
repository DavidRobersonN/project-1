module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'jest': true,
    'node': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    "plugin:react/jsx-runtime",
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks', 'jsx', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 0,
  },
};
