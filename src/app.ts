import express from "express";
import cors from "cors";
import "dotenv/config";
import requestLogger from "@/interfaces/http/middlewares/requestLogger";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/config/swagger";
import { routes } from "./interfaces/http/routes";
import errorHandler from "./interfaces/http/middlewares/errorHandler";

/**
 * Instancia principal de la aplicación Express.
 *
 * Configura middlewares globales, documentación Swagger, rutas base y manejo de errores.
 *
 * - `/docs` → Documentación Swagger UI.
 * - `/api` → Rutas de la API principal.
 *
 * @const {Express.Application} app - Aplicación configurada y lista para levantar servidor.
 */
const app = express();

// Documentación Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares
app.use(cors());
app.use(requestLogger);
app.use(express.json());

// Rutas de la aplicación
app.use("/api", routes);

// Middleware global de manejo de errores
app.use(errorHandler);

export default app;
