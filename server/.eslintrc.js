module.exports = {
  ignorePatterns: ['./node_modules/**/*'],
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    quotes: [2, 'single'],
    semi: 'error'
  },
  plugins: ['only-warn']
}
