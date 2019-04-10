module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/essential', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
};
