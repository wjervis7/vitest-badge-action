require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  "extends": ["plugin:github/recommended",
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": latest
  }
};
