import { db } from "@/config/db";
import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";
import { CreateOrderDTO } from "@/aplication/dto/CreateOrderDTO";
import { OrderStatus } from "@/domain/enums/OrderStatus";
import { Order } from "@/domain/entities/Order";
import { ResultSetHeader } from "mysql2";
import { AssignRouteDTO } from "@/aplication/dto/AssignRouteDTO";
import { DetailedOrder } from "@/domain/interfaces/DetailedOrder";

export class OrderRepository implements IOrderRepository {
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

    async assignRoute(data: AssignRouteDTO): Promise<void> {
        await db.query(
            "UPDATE orders SET route_id = ?, transporter_id = ?, start_time = CURRENT_TIMESTAMP WHERE id = ?",
            [data.routeId, data.transporterId, data.orderId],
        );
    }

    async getAllDetailedOrders(status?: string): Promise<DetailedOrder[]> {
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
        return rows as DetailedOrder[];
    }
}
