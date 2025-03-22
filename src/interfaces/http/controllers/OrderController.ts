import { Request, Response } from "express";
import { CreateOrder } from "@/aplication/use-cases/CreateOrder";
import { OrderRepository } from "@/infrastructure/database/repositories/OrderRepository";
import { successResponse } from "@/shared/helpers/response";
import { handleControllerError } from "@/shared/helpers/handleControllerError";

const repo = new OrderRepository();

/**
 * Controlador para operaciones relacionadas con órdenes de envío.
 *
 * @class OrderController
 */
export class OrderController {
    /**
     * Crea una nueva orden de envío para el usuario autenticado.
     *
     * @param {Request} req - Objeto de solicitud HTTP, debe contener `req.user.id` y datos de la orden en `req.body`.
     * @param {Response} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>}
     *
     * @throws {HttpError} Si hay errores de validación o problemas con la creación de la orden.
     *
     * @example
     * POST /api/orders
     * body: {
     *   weight: 1.5,
     *   dimensions: "30x20x15",
     *   productType: "Electrónica",
     *   destinationAddress: "Cra 10 #20-30, Bogotá"
     * }
     */
    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { id: userId } = (req as Request & { user: { id: number } })
                .user;

            const useCase = new CreateOrder(repo);
            const order = await useCase.execute(userId, req.body);

            successResponse(res, "Orden creada con éxito", { order }, 201);
        } catch (err) {
            handleControllerError(
                res,
                err,
                "No se pudo registrar el envío",
                400,
            );
        }
    }
}
