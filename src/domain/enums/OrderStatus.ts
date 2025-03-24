/**
 * Enum que representa los posibles estados de una orden de envío en el sistema.
 *
 * @enum {string}
 * @property {string} Pending - La orden está pendiente de ser procesada
 * @property {string} InTransit - La orden está en proceso de entrega
 * @property {string} Delivered - La orden ha sido entregada exitosamente
 */
export enum OrderStatus {
    Pending = "pending",
    InTransit = "in_transit",
    Delivered = "delivered",
}
