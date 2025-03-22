import { z } from "zod";

/**
 * Esquema de validación para la creación de una orden de envío.
 *
 * @const {ZodObject} createOrderSchema
 * @property {number} weight - Peso del paquete, debe ser un número positivo.
 * @property {string} dimensions - Dimensiones del paquete, mínimo 3 caracteres.
 * @property {string} productType - Tipo de producto, mínimo 3 caracteres.
 * @property {string} destinationAddress - Dirección de destino, mínimo 5 caracteres.
 */
export const createOrderSchema = z.object({
    weight: z.number().positive(),
    dimensions: z.string().min(3),
    productType: z.string().min(3),
    destinationAddress: z.string().min(5),
});
