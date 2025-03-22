import { Role } from "@/domain/enums/Role";

/**
 * Data Transfer Object (DTO) para el registro de usuarios.
 *
 * @interface RegisterUserDTO
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario.
 * @property {Role} [role] - Rol opcional asignado al usuario (por ejemplo, ADMIN, USER , LOGISTICS).
 */
export interface RegisterUserDTO {
    email: string;
    password: string;
    role?: Role;
}
