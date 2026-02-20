module.exports = {
  env: {
    browser: true,
    node: true,
    es2022: true,
    jest: true,
  },
  ignorePatterns: ['node_modules/**', 'chillnet-double-plus.user.js', 'coverage/**'],
  plugins: ['import'],
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  rules: {
    'import/order': ['error', { 'newlines-between': 'always' }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
