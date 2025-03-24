import { Request, Response } from "express";
import { CreateOrder } from "@/aplication/use-cases/CreateOrder";
import { OrderRepository } from "@/infrastructure/database/repositories/OrderRepository";
import { successResponse } from "@/shared/helpers/response";
import { handleControllerError } from "@/shared/helpers/handleControllerError";
import { redisClient } from "@/config/redis";
import { db } from "@/config/db";
import { HttpError } from "@/shared/errors/HttpError";
import { RowDataPacket } from "mysql2";
import { AssignRoute } from "@/aplication/use-cases/AssignRoute";

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
            if (isNaN(orderId))
                throw new HttpError(400, "ID de orden inválido");

            // 1. Buscar en Redis
            const cachedStatus = await redisClient.get(
                `order:${orderId}:status`,
            );
            if (cachedStatus) {
                successResponse(res, "Estado obtenido desde Redis", {
                    orderId,
                    status: cachedStatus,
                });
                return;
            }

            // 2. Buscar en la base de datos
            const [rows] = await db.query<RowDataPacket[]>(
                "SELECT status FROM orders WHERE id = ?",
                [orderId],
            );

            if (!Array.isArray(rows) || rows.length === 0) {
                throw new HttpError(404, "Orden no encontrada");
            }

            const { status } = rows[0] as RowDataPacket;

            successResponse(res, "Estado obtenido desde la base de datos", {
                orderId,
                status,
            });
        } catch (err) {
            handleControllerError(
                res,
                err,
                "No se pudo obtener el estado",
                400,
            );
        }
    }
}
