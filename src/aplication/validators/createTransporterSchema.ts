import { z } from "zod";

/**
 * Esquema de validación para la creación de un transportador
 * @typedef {Object} CreateTransporterSchema
 * @property {string} name - Nombre del transportador (mínimo 3 caracteres)
 * @property {number} capacity - Capacidad del transportador (debe ser mayor a 0)
 * @property {boolean} [available] - Estado de disponibilidad del transportador (opcional)
 */
export const createTransporterSchema = z.object({
    name: z.string().min(3, "El nombre del transportador es obligatorio"),
    capacity: z.number().min(1, "La capacidad debe ser mayor a 0"),
    available: z.boolean().optional(),
});
