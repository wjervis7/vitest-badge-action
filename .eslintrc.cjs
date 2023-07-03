require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType:"module"
  },
  env: {
    node: true,
    es6: true
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off"
  }
};
