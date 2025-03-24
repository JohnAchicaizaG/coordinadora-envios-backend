import { OrderStatus } from "../enums/OrderStatus";

/**
 * Representa una orden de envío en el sistema.
 *
 * @interface Order
 * @property {number} id - Identificador único de la orden.
 * @property {number} userId - ID del usuario que creó la orden.
 * @property {number} weight - Peso del paquete.
 * @property {string} dimensions - Dimensiones del paquete (ej. "30x20x15 cm").
 * @property {string} productType - Tipo de producto enviado.
 * @property {string} destinationAddress - Dirección de destino del envío.
 * @property {OrderStatus} status - Estado actual de la orden (ej. "En espera", "En tránsito").
 * @property {Date} createdAt - Fecha de creación de la orden.
 */
export interface Order {
    id: number;
    userId: number;
    originAddress: string;
    weight: number;
    dimensions: string;
    productType: string;
    destinationAddress: string;
    status: OrderStatus;
    start_time: Date | null;
    delivered_time: Date | null;
    createdAt: Date;
}
