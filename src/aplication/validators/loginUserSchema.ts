import { z } from "zod";

/**
 * Esquema de validación para el login de usuarios.
 *
 * @const {ZodObject} loginUserSchema
 * @property {string} email - Correo electrónico válido y obligatorio.
 * @property {string} password - Contraseña con mínimo 6 caracteres.
 */
export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
