import js from "@eslint/js"
import ts from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import importPlugin from "eslint-plugin-import"
import unusedImports from "eslint-plugin-unused-imports"
import prettier from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"

export default [
  {
    ignores: ["dist", "node_modules", ".env"]
  },

  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly"
      }
    },

    plugins: {
      "@typescript-eslint": ts,
      import: importPlugin,
      "unused-imports": unusedImports,
      prettier: prettier
    },

    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...prettierConfig.rules,

      "unused-imports/no-unused-imports": "warn",

      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          "alphabetize": { order: "asc", caseInsensitive: true }
        }
      ],

      "prettier/prettier": "warn",

      "@typescript-eslint/no-unused-vars": "off"
    }
  }
]
