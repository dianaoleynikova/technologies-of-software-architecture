import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  },
  {
    files: ["src/__tests__/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      }
    }
  }
];

