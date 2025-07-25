// packages/eslint-config/react.cjs
const js = require("@eslint/js");
const eslintConfigPrettier = require("eslint-config-prettier");
const tseslint = require("typescript-eslint");
const pluginReactHooks = require("eslint-plugin-react-hooks");
const pluginReact = require("eslint-plugin-react");
const globals = require("globals");
const baseConfig = require("./base.cjs");

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

module.exports = config;
