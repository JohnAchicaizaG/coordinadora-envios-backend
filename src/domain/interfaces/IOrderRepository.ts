import { AdvancedOrderFilterDTO } from "@/aplication/dto/AdvancedOrderFilterDTO";
import { AssignRouteDTO } from "@/aplication/dto/AssignRouteDTO";
import { CreateOrderDTO } from "@/aplication/dto/CreateOrderDTO";
import { Order } from "@/domain/entities/Order";
import { DetailedOrder } from "./DetailedOrder";

/**
 * Interfaz para el repositorio de órdenes.
 * Define las operaciones que deben implementarse para gestionar órdenes en la capa de persistencia.
 *
 * @interface IOrderRepository
 */
export interface IOrderRepository {
    /**
     * Crea una nueva orden de envío en el sistema.
     *
     * @param {CreateOrderDTO & { userId: number }} data - Datos de la orden, incluyendo el ID del usuario creador.
     * @returns {Promise<Order>} Orden recién creada.
     */
    createOrder(data: CreateOrderDTO & { userId: number }): Promise<Order>;
    assignRoute(data: AssignRouteDTO): Promise<void>;
    getAdvancedReport(
        filters: AdvancedOrderFilterDTO,
    ): Promise<DetailedOrder[]>;
}
