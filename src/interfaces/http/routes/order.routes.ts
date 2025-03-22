import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { validateSchema } from "../middlewares/validateSchema";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createOrderSchema } from "../../../aplication/validators/createOrderSchema";

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
