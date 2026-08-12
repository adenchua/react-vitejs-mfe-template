import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

// eslint-plugin-react and eslint-plugin-jsx-a11y are deliberately NOT
// included: neither has caught up to ESLint 10 yet (both cap their peer
// range at ^9), and eslint-plugin-react has an open runtime-crash report
// against ESLint 10. Revisit adding them once upstream catches up.
//
// Uses ESLint core's own defineConfig() rather than typescript-eslint's
// tseslint.config() helper, which typescript-eslint now deprecates in
// favor of this.
export default defineConfig(
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-console": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      curly: ["error", "all"],
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
      complexity: ["warn", 20],
      "@typescript-eslint/promise-function-async": "error",
    },
  },
  {
    // Node-context config files: not part of the client bundle, so console
    // output for build-time error reporting is intentional here.
    files: ["vite.config.ts", "eslint.config.ts", "env.schema.ts"],
    languageOptions: { globals: globals.node },
    rules: { "no-console": "off" },
  },
  eslintConfigPrettier,
);
