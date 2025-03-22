import { Role } from "../enums/Role";

/**
 * Representa un usuario del sistema.
 *
 * @interface User
 * @property {number} id - Identificador único del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña en formato encriptado.
 * @property {Role} role - Rol asignado al usuario (por ejemplo, admin, user, logistics).
 */
export interface User {
    id: number;
    email: string;
    password: string;
    role: Role;
}
