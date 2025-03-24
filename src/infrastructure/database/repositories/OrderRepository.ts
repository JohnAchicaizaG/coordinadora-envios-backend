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
import { AdvancedOrderFilterDTO } from "@/aplication/dto/AdvancedOrderFilterDTO";
import moment from "moment-timezone";
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

    /**
     * Obtiene el estado actual de una orden específica.
     * Implementa un patrón de caché con Redis para mejorar el rendimiento.
     *
     * @param {number} orderId - ID de la orden a consultar
     * @returns {Promise<string>} Estado actual de la orden
     * @throws {HttpError} 404 - Si la orden no existe
     * @throws {Error} Si hay un error al consultar la base de datos o el caché
     *
     * @example
     * const status = await orderRepository.getOrderStatus(123);
     */
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

    /**
     * Obtiene un reporte detallado de órdenes basado en filtros avanzados.
     * Implementa un patrón de caché con Redis para mejorar el rendimiento.
     *
     * @param {AdvancedOrderFilterDTO} filters - Objeto con los filtros a aplicar
     * @param {string} [filters.status] - Estado de las órdenes a filtrar
     * @param {Date} [filters.startDate] - Fecha inicial del rango
     * @param {Date} [filters.endDate] - Fecha final del rango
     * @param {number} [filters.transporterId] - ID del transportador
     * @param {number} [filters.routeId] - ID de la ruta
     * @returns {Promise<DetailedOrder[]>} Lista de órdenes detalladas que cumplen con los filtros
     * @throws {Error} Si hay un error al consultar la base de datos o el caché
     *
     * @example
     * const filters = {
     *   status: 'PENDING',
     *   startDate: new Date('2024-01-01'),
     *   endDate: new Date('2024-01-31')
     * };
     * const report = await orderRepository.getAdvancedReport(filters);
     */
    async getAdvancedReport(
        filters: AdvancedOrderFilterDTO,
    ): Promise<DetailedOrder[]> {
        const { status, startDate, endDate, transporterId, routeId } = filters;

        const queryParts: string[] = [];
        const values: (string | number | Date)[] = [];

        // 🕒 Convertir fechas a zona horaria 'America/Bogota'
        if (startDate) {
            const zonedStart = moment
                .tz(startDate, "America/Bogota")
                .startOf("day")
                .format("YYYY-MM-DD HH:mm:ss");
            queryParts.push("o.created_at >= ?");
            values.push(zonedStart);
        }

        if (endDate) {
            const zonedEnd = moment
                .tz(endDate, "America/Bogota")
                .endOf("day")
                .format("YYYY-MM-DD HH:mm:ss");
            queryParts.push("o.created_at <= ?");
            values.push(zonedEnd);
        }

        if (status) {
            queryParts.push("o.status = ?");
            values.push(status);
        }

        if (transporterId) {
            queryParts.push("o.transporter_id = ?");
            values.push(transporterId);
        }

        if (routeId) {
            queryParts.push("o.route_id = ?");
            values.push(routeId);
        }

        const whereClause =
            queryParts.length > 0 ? `WHERE ${queryParts.join(" AND ")}` : "";
        const cacheKey = `orders:report:${Buffer.from(JSON.stringify(filters)).toString("base64")}`;

        const cached = await redisClient.get(cacheKey);
        if (cached) return JSON.parse(cached);

        const query = `
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
        ${whereClause}
        ORDER BY o.created_at DESC
    `;

        const [rows] = await db.query(query, values);
        const results = rows as DetailedOrder[];

        await redisClient.set(cacheKey, JSON.stringify(results), {
            EX: 60 * 5,
        });

        return results;
    }
}
