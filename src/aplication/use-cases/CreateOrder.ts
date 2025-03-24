import { CreateOrderDTO } from "../dto/CreateOrderDTO";
import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";
import { Order } from "@/domain/entities/Order";
import { HttpError } from "@/shared/errors/HttpError";
import { isValidAddress } from "@/shared/utils/validateAddressWithGoogle";
import { OrderStatus } from "@/domain/enums/OrderStatus";
import { updateOrderStatus } from "@/shared/utils/updateOrderStatus";

/**
 * Caso de uso para la creación de una orden de envío.
 *
 * @class CreateOrder
 */
export class CreateOrder {
    /**
     * Crea una instancia de CreateOrder.
     *
     * @param {IOrderRepository} orderRepo - Repositorio para operaciones relacionadas con órdenes.
     */
    constructor(private readonly orderRepo: IOrderRepository) {}

    /**
     * Ejecuta el proceso de creación de una nueva orden de envío.
     *
     * @param {number} userId - ID del usuario que está creando la orden.
     * @param {CreateOrderDTO} data - Datos del paquete y dirección de destino.
     * @returns {Promise<Order>} Orden creada exitosamente.
     *
     * @throws {HttpError} Si la dirección de destino no es válida.
     */
    async execute(userId: number, data: CreateOrderDTO): Promise<Order> {
        const isOriginValid = await isValidAddress(data.originAddress);
        if (!isOriginValid)
            throw new HttpError(400, "Dirección de origen inválida");

        const valid = await isValidAddress(data.destinationAddress);
        if (!valid) throw new HttpError(400, "Dirección de destino inválida");

        // Crear la orden en la base de datos
        const order = await this.orderRepo.createOrder({ ...data, userId });

        // 🧠 Centraliza: actualiza BD, historial, Redis y socket
        await updateOrderStatus(order.id, OrderStatus.Pending);

        return order;
    }
}
