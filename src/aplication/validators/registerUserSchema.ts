import { z } from "zod";
import { Role } from "@/domain/enums/Role";

/**
 * Esquema de validación para el registro de usuarios.
 *
 * @const {ZodObject} registerUserSchema
 * @property {string} email - Correo electrónico válido y obligatorio.
 * @property {string} password - Contraseña con mínimo 6 caracteres.
 * @property {Role} [role] - Rol opcional asignado al usuario (por defecto "user").
 */
export const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.nativeEnum(Role).optional(),
});
