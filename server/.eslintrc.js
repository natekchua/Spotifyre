module.exports = {
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['./node_modules/**/*'],
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['only-warn', '@typescript-eslint'],
  rules: {
    quotes: [2, 'single'],
    semi: [2, 'always'],
    "@"
  },
};
