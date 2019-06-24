module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 0,
  },
};
