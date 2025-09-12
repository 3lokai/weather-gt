// ESLint configuration

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  ignores: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".bmad-core/**",
    ".claude/**",
    ".cursor/**",
    "clear-cache.js",
  ],
}, {
  rules: {
    // Skip escape key and definition errors
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    // Allow console statements for development
    "no-console": "off",
    // Allow unused imports during development
    "unused-imports/no-unused-imports": "off",
    "unused-imports/no-unused-vars": "off",
  },
}];

export default eslintConfig;
