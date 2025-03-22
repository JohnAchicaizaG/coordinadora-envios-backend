import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
    {
        languageOptions: {
            globals: globals.node,
        },
    },
    {
        ignores: ["dist/"],
    },
    { files: ["src/**/*.{js,ts,jsx,tsx}", "tests/**/*.{js,ts,jsx,tsx}"] },
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: { globals: globals.node },
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        plugins: { js, import: importPlugin },
        extends: ["js/recommended"],
    },
    tseslint.configs.recommended,
    {
        files: ["tests/**/*.{js,ts,jsx,tsx}"],
        ...jest.configs["flat/recommended"],
        rules: {
            ...jest.configs["flat/recommended"].rules,
            "jest/prefer-expect-assertions": "off",
        },
    },
    {
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-empty-function": "error",
            "prefer-const": "error",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            eqeqeq: ["warn", "always"],
        },
    },
    eslintPluginPrettierRecommended,
    {
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },
    },
]);
