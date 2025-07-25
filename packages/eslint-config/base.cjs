// packages/eslint-config/base.cjs
const js = require("@eslint/js");
const eslintConfigPrettier = require("eslint-config-prettier");
const turboPlugin = require("eslint-plugin-turbo");
const tseslint = require("typescript-eslint");
const onlyWarn = require("eslint-plugin-only-warn");

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      // '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**", "**/*.cjs", "**/*.mjs", "node_modules/**", "coverage/**", "build/**"],
  },
];

module.exports = config;
