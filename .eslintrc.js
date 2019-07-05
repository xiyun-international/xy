module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: ['prettier'],
  env: {
    browser: false,
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
    // '@typescript-eslint/indent': ['error', 2],
    // '@typescript-eslint/explicit-function-return-type': 0,
    'no-console': 'off',
    'prefer-const': 'off',
    'consistent-return': 'off',
    'no-unused-vars': 'off',
    'one-var': 'off',
    'import/no-unresolved': 'off',
  },
};
