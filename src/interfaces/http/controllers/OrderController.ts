import { Request, Response } from "express";
import { CreateOrder } from "@/aplication/use-cases/CreateOrder";
import { OrderRepository } from "@/infrastructure/database/repositories/OrderRepository";
import { successResponse } from "@/shared/helpers/response";
import { handleControllerError } from "@/shared/helpers/handleControllerError";
import { HttpError } from "@/shared/errors/HttpError";
import { AssignRoute } from "@/aplication/use-cases/AssignRoute";
import { AdvancedOrderFilterDTO } from "@/aplication/dto/AdvancedOrderFilterDTO";
import { updateOrderStatus } from "@/shared/utils/updateOrderStatus";

const repo = new OrderRepository();

/**
 * Controlador para operaciones relacionadas con órdenes de envío.
 * Maneja la creación, consulta y asignación de rutas para órdenes.
 *
 * @class OrderController
 */
export class OrderController {
    /**
     * Asigna una ruta a una orden específica.
     *
     * @param {Request} req - Objeto de solicitud de Express
     * @param {Response} res - Objeto de respuesta de Express
     * @returns {Promise<void>} Promesa que se resuelve cuando se completa la asignación
     * @throws {Error} Si hay un error al asignar la ruta
     */
    static async assignRoute(req: Request, res: Response): Promise<void> {
        try {
            const useCase = new AssignRoute(new OrderRepository());
            await useCase.execute(req.body); // Validar antes
            successResponse(res, "Ruta asignada con éxito", null, 200);
        } catch (error) {
            handleControllerError(res, error, "Error al asignar la ruta");
        }
    }

    /**
     * Obtiene todas las órdenes con detalles, opcionalmente filtradas por estado.
     *
     * @param {Request} req - Objeto de solicitud de Express
     * @param {Response} res - Objeto de respuesta de Express
     * @returns {Promise<void>} Promesa que se resuelve con la lista de órdenes
     * @throws {Error} Si hay un error al obtener las órdenes
     */
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { status } = req.query;
            const orders = await repo.getAllDetailedOrders(
                status as string | undefined,
            );
            successResponse(res, "Órdenes obtenidas con éxito", { orders });
        } catch (err) {
            handleControllerError(res, err, "Error al obtener órdenes");
        }
    }

    /**
     * Crea una nueva orden de envío.
     *
     * @param {Request} req - Objeto de solicitud de Express
     * @param {Response} res - Objeto de respuesta de Express
     * @returns {Promise<void>} Promesa que se resuelve cuando se crea la orden
     * @throws {Error} Si hay un error al crear la orden
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

    /**
     * Consulta el estado actual de una orden por ID.
     * Primero intenta obtener el estado desde Redis, si no está disponible,
     * lo obtiene desde la base de datos.
     *
     * @param {Request} req - Objeto de solicitud de Express
     * @param {Response} res - Objeto de respuesta de Express
     * @returns {Promise<void>} Promesa que se resuelve con el estado de la orden
     * @throws {HttpError} Si el ID de orden es inválido o la orden no existe
     */
    static async getStatus(req: Request, res: Response): Promise<void> {
        try {
            const orderId = Number(req.params.orderId);
            if (isNaN(orderId)) {
                throw new HttpError(400, "ID de orden inválido");
            }

            const status = await repo.getOrderStatus(orderId);

            successResponse(res, "Estado obtenido correctamente", {
                orderId,
                status,
            });
        } catch (err) {
            handleControllerError(res, err, "No se pudo obtener el estado");
        }
    }

    static async getAdvancedReport(req: Request, res: Response): Promise<void> {
        try {
            const filters = req.query as unknown as AdvancedOrderFilterDTO;
            const orders = await repo.getAdvancedReport(filters);
            successResponse(res, "Reporte obtenido con éxito", { orders });
        } catch (err) {
            handleControllerError(res, err, "Error al obtener el reporte");
        }
    }

    /**
     * Actualiza el estado de una orden específica y emite la actualización a través de WebSocket.
     *
     * @param {Request} req - Objeto de solicitud de Express que contiene:
     * @param {Object} req.params - Parámetros de la URL
     * @param {string} req.params.orderId - ID de la orden a actualizar
     * @param {Object} req.body - Cuerpo de la solicitud
     * @param {string} req.body.status - Nuevo estado de la orden
     * @param {Response} res - Objeto de respuesta de Express
     * @returns {Promise<void>} Promesa que se resuelve cuando se completa la actualización
     * @throws {Error} Si hay un error al actualizar el estado o si los parámetros son inválidos
     */
    static async updateStatus(req: Request, res: Response): Promise<void> {
        try {
            const orderId = Number(req.params.orderId);
            const { status } = req.body;

            if (isNaN(orderId) || !status) {
                res.status(400).json({ message: "Parámetros inválidos" });
                return;
            }

            // ✅ Usamos el helper centralizado
            await updateOrderStatus(orderId, status);

            res.status(200).json({
                success: true,
                message:
                    "Estado actualizado correctamente y emitido por socket",
                data: { orderId, status },
            });
        } catch (error) {
            handleControllerError(res, error, "Error al actualizar estado");
        }
    }
}
