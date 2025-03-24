import { z } from "zod";

/**
 * Esquema de validación para asignar una ruta a un pedido
 * @typedef {Object} AssignRouteSchema
 * @property {number} orderId - ID del pedido a asignar
 * @property {number} routeId - ID de la ruta a asignar
 * @property {number} transporterId - ID del transportador asignado
 */
export const assignRouteSchema = z.object({
    orderId: z.number().int().positive(),
    routeId: z.number().int().positive(),
    transporterId: z.number().int().positive(),
});
