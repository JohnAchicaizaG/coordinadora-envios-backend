import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { validateSchema } from "../middlewares/validateSchema";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createOrderSchema } from "../../../aplication/validators/createOrderSchema";
import { assignRouteSchema } from "@/aplication/validators/assignRouteSchema";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { Role } from "@/domain/enums/Role";
import { advancedOrderFilterSchema } from "@/aplication/validators/advancedOrderFilterSchema";

/**
 * Rutas relacionadas con la gestión de órdenes de envío.
 *
 * @const {Router} orderRoutes - Router que define los endpoints para órdenes.
 */
export const orderRoutes = Router();

/**
 * @route POST /create
 * @description Crea una nueva orden de envío.
 * @middleware isAuthenticated - Verifica si el usuario está autenticado mediante JWT.
 * @middleware validateSchema(createOrderSchema) - Valida el cuerpo de la solicitud.
 * @controller OrderController.create
 *
 * @example
 * POST /api/orders/create
 * body: {
 *   weight: 2,
 *   dimensions: "40x30x20",
 *   productType: "Libros",
 *   destinationAddress: "Calle 123 #45-67, Medellín"
 * }
 */
orderRoutes.post(
    "/create",
    isAuthenticated,
    validateSchema(createOrderSchema),
    OrderController.create,
);

/**
 * @route GET /status/:orderId
 * @description Obtiene el estado actual de una orden específica.
 * @middleware isAuthenticated - Verifica si el usuario está autenticado mediante JWT.
 * @controller OrderController.getStatus
 *
 * @param {string} orderId - ID único de la orden
 * @returns {Object} Estado actual de la orden
 */
orderRoutes.get("/status/:orderId", isAuthenticated, OrderController.getStatus);

/**
 * @route POST /assign
 * @description Asigna una ruta a una orden específica.
 * @middleware isAuthenticated - Verifica si el usuario está autenticado mediante JWT.
 * @middleware validateSchema(assignRouteSchema) - Valida el cuerpo de la solicitud.
 * @controller OrderController.assignRoute
 *
 * @example
 * POST /api/orders/assign
 * body: {
 *   orderId: "123",
 *   routeId: "456",
 *   assignedTo: "789"
 * }
 */
orderRoutes.post(
    "/assign",
    isAuthenticated,
    validateSchema(assignRouteSchema),
    OrderController.assignRoute,
);

/**
 * @route GET /admin
 * @description Obtiene todas las órdenes (endpoint administrativo).
 * @controller OrderController.getAll
 *
 * @returns {Array} Lista de todas las órdenes en el sistema
 */
orderRoutes.get(
    "/admin",
    isAuthenticated,
    authorizeRoles(Role.Admin),
    OrderController.getAll,
);

/**
 * @route GET /report/advanced
 * @description Obtiene un reporte avanzado de órdenes basado en filtros específicos.
 * @middleware isAuthenticated - Verifica si el usuario está autenticado mediante JWT.
 * @middleware validateSchema(advancedOrderFilterSchema, "query") - Valida los parámetros de consulta.
 * @controller OrderController.getAdvancedReport
 *
 * @returns {Object} Reporte avanzado de órdenes filtrado según los criterios especificados
 */
orderRoutes.get(
    "/report/advanced",
    isAuthenticated,
    validateSchema(advancedOrderFilterSchema, "query"),
    OrderController.getAdvancedReport,
);

/**
 * @route PATCH /:orderId/status
 * @description Actualiza el estado de una orden específica.
 * @middleware isAuthenticated - Verifica si el usuario está autenticado mediante JWT.
 * @controller OrderController.updateStatus
 *
 * @param {string} orderId - ID único de la orden a actualizar
 * @returns {Object} Orden actualizada con su nuevo estado
 */
orderRoutes.patch(
    "/:orderId/status",
    isAuthenticated,
    OrderController.updateStatus,
);
