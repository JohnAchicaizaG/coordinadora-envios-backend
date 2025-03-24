import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";
import { AssignRouteDTO } from "../dto/AssignRouteDTO";
import { updateOrderStatus } from "@/shared/utils/updateOrderStatus";

/**
 * Clase que maneja la asignación de rutas a órdenes
 * @class AssignRoute
 */
export class AssignRoute {
    /**
     * Crea una instancia de AssignRoute
     * @param {IOrderRepository} orderRepo - Repositorio de órdenes para realizar operaciones en la base de datos
     */
    constructor(private readonly orderRepo: IOrderRepository) {}

    /**
     * Ejecuta la asignación de ruta a una orden
     * @param {AssignRouteDTO} data - Datos necesarios para asignar la ruta
     * @returns {Promise<void>} Promesa que se resuelve cuando se completa la asignación
     */
    async execute(data: AssignRouteDTO): Promise<void> {
        await this.orderRepo.assignRoute(data);
        await updateOrderStatus(data.orderId, "in_transit");
    }
}
