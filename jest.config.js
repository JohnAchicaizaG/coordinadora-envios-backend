/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    // Usa el preset de `ts-jest` para ejecutar pruebas en TypeScript sin compilar antes
    preset: "ts-jest",

    // Especifica que el entorno de pruebas será Node.js (útil para backend)
    testEnvironment: "node",

    // Define la carpeta raíz donde están las pruebas
    roots: ["<rootDir>/tests"],

    // Usa `ts-jest` para transformar archivos TypeScript antes de ejecutarlos
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },

    // Define cómo Jest debe encontrar los archivos de prueba
    testRegex: "((\\.|/)(test|spec))\\.tsx?$",

    // Especifica las extensiones de archivos que Jest reconocerá
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    // Opcional: Define alias para importar módulos sin usar rutas relativas
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1",
        "^@tests/(.*)$": "<rootDir>/tests/$1",
    },

    // Opcional: Habilita cobertura de código en las pruebas
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],

    // Opcional: Especifica dónde guardar los reportes de cobertura
    coverageDirectory: "coverage",

    // Opcional: Configura qué reportes de cobertura generar
    coverageReporters: ["json", "lcov", "text", "clover"],

    // Ignora `node_modules` al ejecutar pruebas para mayor rendimiento
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],

    // Especifica directorios donde buscar módulos (evita usar rutas relativas `../../`)
    moduleDirectories: ["node_modules", "src"],
};
