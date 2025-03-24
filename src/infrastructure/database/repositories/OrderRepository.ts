import { db } from "@/config/db";
import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";
import { CreateOrderDTO } from "@/aplication/dto/CreateOrderDTO";
import { OrderStatus } from "@/domain/enums/OrderStatus";
import { Order } from "@/domain/entities/Order";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AssignRouteDTO } from "@/aplication/dto/AssignRouteDTO";
import { DetailedOrder } from "@/domain/interfaces/DetailedOrder";
import { redisClient } from "@/config/redis";
import { HttpError } from "@/shared/errors/HttpError";

/**
 * Implementación del repositorio de órdenes que maneja las operaciones de base de datos
 * y caché para las órdenes del sistema.
 */
export class OrderRepository implements IOrderRepository {
    /**
     * Crea una nueva orden en el sistema.
     * @param {CreateOrderDTO & { userId: number }} data - Datos de la orden a crear, incluyendo el ID del usuario
     * @returns {Promise<Order>} La orden creada con su ID y timestamps
     * @throws {Error} Si hay un error al insertar en la base de datos
     */
    async createOrder(
        data: CreateOrderDTO & { userId: number },
    ): Promise<Order> {
        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO orders (user_id, origin_address, weight, dimensions, product_type, destination_address, status) VALUES (?, ? ,?, ?, ?, ?, ?)",
            [
                data.userId,
                data.originAddress,
                data.weight,
                data.dimensions,
                data.productType,
                data.destinationAddress,
                OrderStatus.Pending,
            ],
        );

        return {
            id: result.insertId,
            ...data,
            status: OrderStatus.Pending,
            start_time: null,
            delivered_time: null,
            createdAt: new Date(),
        };
    }

    /**
     * Asigna una ruta y un transportador a una orden existente.
     * @param {AssignRouteDTO} data - Datos de asignación de ruta
     * @returns {Promise<void>}
     * @throws {Error} Si hay un error al actualizar la orden
     */
    async assignRoute(data: AssignRouteDTO): Promise<void> {
        await db.query(
            "UPDATE orders SET route_id = ?, transporter_id = ?, start_time = CURRENT_TIMESTAMP WHERE id = ?",
            [data.routeId, data.transporterId, data.orderId],
        );
    }

    /**
     * Obtiene todos los pedidos detallados con información de rutas y transportadores.
     * Implementa un patrón de caché con Redis para mejorar el rendimiento.
     *
     * @param {string} [status] - Estado opcional para filtrar los pedidos
     * @returns {Promise<DetailedOrder[]>} Lista de pedidos detallados con información de rutas y transportadores
     * @throws {Error} Si hay un error al consultar la base de datos o el caché
     *
     * @example
     * const allOrders = await orderRepository.getAllDetailedOrders();
     *
     * const pendingOrders = await orderRepository.getAllDetailedOrders('PENDING');
     */
    async getAllDetailedOrders(status?: string): Promise<DetailedOrder[]> {
        const cacheKey = status ? `orders:status:${status}` : "orders:all";

        //  1. Intentar obtener del cache
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }

        //  2. Si no hay cache, consultar la base de datos
        const baseQuery = `
            SELECT 
                o.id AS orderId,
                o.origin_address AS originAddress, 
                o.weight,
                o.dimensions,
                o.product_type AS productType,
                o.destination_address AS destination,
                o.status,
                o.created_at,
                r.name AS routeName,
                t.name AS transporterName
            FROM orders o
            LEFT JOIN routes r ON o.route_id = r.id
            LEFT JOIN transporters t ON o.transporter_id = t.id
            ${status ? "WHERE o.status = ?" : ""}
            ORDER BY o.created_at DESC
        `;

        const [rows] = await db.query(baseQuery, status ? [status] : []);
        const orders = rows as DetailedOrder[];

        // 3. Guardar en Redis para futuras consultas
        await redisClient.set(cacheKey, JSON.stringify(orders), {
            EX: 60 * 5,
        });

        return orders;
    }

    async getOrderStatus(orderId: number): Promise<string> {
        // 1. Intentar desde Redis
        const cachedStatus = await redisClient.get(`order:${orderId}:status`);
        if (cachedStatus) return cachedStatus;

        // 2. Si no hay, ir a la base de datos
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT status FROM orders WHERE id = ?",
            [orderId],
        );

        if (!Array.isArray(rows) || rows.length === 0) {
            throw new HttpError(404, "Orden no encontrada");
        }

        const { status } = rows[0] as RowDataPacket;
        return status;
    }
}
