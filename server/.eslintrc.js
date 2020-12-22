module.exports = {
  ignorePatterns: ['./node_modules/**/*'],
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  plugins: ['only-warn'],
};
