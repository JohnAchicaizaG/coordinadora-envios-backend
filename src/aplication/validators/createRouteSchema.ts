import { z } from "zod";

/**
 * Esquema de validación para crear una nueva ruta.
 *
 * @const createRouteSchema
 * @property {string} name - Nombre de la ruta, requerido y mínimo 3 caracteres.
 */
export const createRouteSchema = z.object({
    name: z
        .string({
            required_error: "El nombre de la ruta es obligatorio",
        })
        .min(3, "El nombre debe tener al menos 3 caracteres"),
});
