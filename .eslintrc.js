module.exports = {
  plugins: ['@typescript-eslint', 'no-null'],
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    project: './tsconfig.json'
  },
  extends: [
    'escapace'
  ],
  rules: {
    "@typescript-eslint/require-await": 0,
    "@typescript-eslint/no-floating-promises": 0
  }
}
