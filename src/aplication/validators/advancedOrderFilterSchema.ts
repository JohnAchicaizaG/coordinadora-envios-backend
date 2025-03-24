import { z } from "zod";

/**
 * Esquema de validación para filtros avanzados de órdenes
 * @typedef {Object} AdvancedOrderFilter
 * @property {string} [status] - Estado de la orden
 * @property {string} [startDate] - Fecha de inicio para filtrar órdenes
 * @property {string} [endDate] - Fecha de fin para filtrar órdenes
 * @property {number} [transporterId] - ID del transportador
 * @property {number} [routeId] - ID de la ruta
 */
export const advancedOrderFilterSchema = z.object({
    status: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    transporterId: z.coerce.number().optional(),
    routeId: z.coerce.number().optional(),
});
