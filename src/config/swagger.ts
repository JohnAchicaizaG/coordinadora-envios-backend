import swaggerJSDoc from "swagger-jsdoc";

/**
 * Especificación de Swagger generada automáticamente para documentar la API.
 *
 * @const {object} swaggerSpec - Objeto con la configuración de Swagger/OpenAPI.
 *
 * Configuración:
 * - `openapi`: Versión de OpenAPI utilizada (3.0.0).
 * - `info`: Información general de la API (título, versión y descripción).
 * - `servers`: Lista de servidores disponibles (ej. localhost).
 * - `components.securitySchemes`: Define los esquemas de autenticación (Bearer JWT).
 * - `security`: Aplica el esquema de seguridad por defecto en todos los endpoints (opcional).
 * - `apis`: Archivos donde Swagger buscará anotaciones para generar la documentación.
 */
export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Skeleton Node API",
            version: "1.0.0",
            description: "Documentación de la API organizada por módulos",
        },
        tags: [
            {
                name: "Auth",
                description: "Endpoints de autenticación (login y registro)",
            },
            {
                name: "Usuarios",
                description: "Gestión de usuarios y sus roles",
            },
            {
                name: "Órdenes",
                description: "Creación y gestión de órdenes de envío",
            },
            {
                name: "Logística",
                description: "Rutas, asignaciones y transportistas",
            },
        ],
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        "src/docs/*.ts",
        "src/interfaces/http/routes/*.ts",
        "src/interfaces/http/controllers/*.ts",
    ],
});
