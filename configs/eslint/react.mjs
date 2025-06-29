const base = require("../base");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ...base,
  extends: [
    ...base.extends,
    "plugin:react/recommended",
    "next/core-web-vitals"
  ],
  settings: {
    react: { version: "detect" }
  },
};
