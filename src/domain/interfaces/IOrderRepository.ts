import { AdvancedOrderFilterDTO } from "@/aplication/dto/AdvancedOrderFilterDTO";
import { AssignRouteDTO } from "@/aplication/dto/AssignRouteDTO";
import { CreateOrderDTO } from "@/aplication/dto/CreateOrderDTO";
import { Order } from "@/domain/entities/Order";
import { DetailedOrder } from "./DetailedOrder";
import { TransporterPerformanceMetric } from "@/aplication/dto/TransporterPerformanceMetric";

/**
 * Interfaz para el repositorio de órdenes.
 * Define las operaciones que deben implementarse para gestionar órdenes en la capa de persistencia.
 * Esta interfaz es el contrato principal para todas las operaciones relacionadas con órdenes en el sistema.
 *
 * @interface IOrderRepository
 */
export interface IOrderRepository {
    /**
     * Crea una nueva orden de envío en el sistema.
     *
     * @param {CreateOrderDTO & { userId: number }} data - Datos de la orden, incluyendo el ID del usuario creador.
     * @returns {Promise<Order>} Orden recién creada con su ID y timestamps.
     * @throws {Error} Si hay un error al insertar en la base de datos.
     */
    createOrder(data: CreateOrderDTO & { userId: number }): Promise<Order>;

    /**
     * Asigna una ruta y un transportador a una orden existente.
     * Actualiza el estado de la orden a "in_transit" y registra el tiempo de inicio.
     *
     * @param {AssignRouteDTO} data - Datos de asignación de ruta, incluyendo orderId, routeId y transporterId.
     * @returns {Promise<void>} Promesa que se resuelve cuando se completa la asignación.
     * @throws {Error} Si hay un error al actualizar la orden o si la orden no existe.
     */
    assignRoute(data: AssignRouteDTO): Promise<void>;

    /**
     * Obtiene un reporte detallado de órdenes basado en filtros avanzados.
     * Incluye métricas de rendimiento de los transportadores.
     *
     * @param {AdvancedOrderFilterDTO} filters - Objeto con los filtros a aplicar:
     * @param {string} [filters.status] - Estado de las órdenes a filtrar
     * @param {Date} [filters.startDate] - Fecha inicial del rango
     * @param {Date} [filters.endDate] - Fecha final del rango
     * @param {number} [filters.transporterId] - ID del transportador
     * @param {number} [filters.routeId] - ID de la ruta
     * @returns {Promise<{orders: DetailedOrder[], metrics?: TransporterPerformanceMetric[]}>}
     * Objeto con la lista de órdenes detalladas y métricas de rendimiento opcionales.
     * @throws {Error} Si hay un error al consultar la base de datos o el caché.
     */
    getAdvancedReport(filters: AdvancedOrderFilterDTO): Promise<{
        orders: DetailedOrder[];
        metrics?: TransporterPerformanceMetric[];
    }>;
}
