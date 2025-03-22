import { db } from "@/config/db";
import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";
import { CreateOrderDTO } from "@/aplication/dto/CreateOrderDTO";
import { OrderStatus } from "@/domain/enums/OrderStatus";
import { Order } from "@/domain/entities/Order";
import { ResultSetHeader } from "mysql2";

export class OrderRepository implements IOrderRepository {
    async createOrder(
        data: CreateOrderDTO & { userId: number },
    ): Promise<Order> {
        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO orders (user_id, weight, dimensions, product_type, destination_address, status) VALUES (?, ?, ?, ?, ?, ?)",
            [
                data.userId,
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
            createdAt: new Date(),
        };
    }
}
