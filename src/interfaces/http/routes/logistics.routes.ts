import { Router } from "express";
import { LogisticsController } from "../controllers/LogisticsController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createTransporterSchema } from "@/aplication/validators/createTransporterSchema";
import { validateSchema } from "../middlewares/validateSchema";
import { createRouteSchema } from "@/aplication/validators/createRouteSchema";

/**
 * Rutas relacionadas con la gestión logística (transportistas y rutas).
 *
 * @const {Router} logisticsRoutes - Router que define los endpoints de logística.
 */
export const logisticsRoutes = Router();

/**
 * @route GET /transporters
 * @description Obtiene todos los transportistas.
 * @controller LogisticsController.getAllTransporters
 *
 * @example
 * GET /api/logistics/transporters
 */
logisticsRoutes.get("/transporters", LogisticsController.getAllTransporters);

/**
 * @route POST /transporters
 * @description Crea un nuevo transportista.
 * @middleware isAuthenticated - Verifica si el usuario está autenticado mediante JWT.
 * @middleware validateSchema(createTransporterSchema) - Valida el cuerpo de la solicitud.
 * @controller LogisticsController.createTransporter
 *
 * @example
 * POST /api/logistics/transporters
 * body: {
 *   name: "Juan Pérez",
 *   available: true,
 *   capacity: 100
 * }
 */
logisticsRoutes.post(
    "/transporters",
    isAuthenticated,
    validateSchema(createTransporterSchema),
    LogisticsController.createTransporter,
);

/**
 * @route GET /routes
 * @description Obtiene todas las rutas.
 * @controller LogisticsController.getAllRoutes
 *
 * @example
 * GET /api/logistics/routes
 */
logisticsRoutes.get("/routes", LogisticsController.getAllRoutes);

/**
 * @route POST /routes
 * @description Crea una nueva ruta.
 * @middleware isAuthenticated - Verifica si el usuario está autenticado mediante JWT.
 * @middleware validateSchema(createRouteSchema) - Valida el cuerpo de la solicitud.
 * @controller LogisticsController.createRoute
 *
 * @example
 * POST /api/logistics/routes
 * body: {
 *   name: "Ruta Norte"
 * }
 */
logisticsRoutes.post(
    "/routes",
    isAuthenticated,
    validateSchema(createRouteSchema),
    LogisticsController.createRoute,
);
