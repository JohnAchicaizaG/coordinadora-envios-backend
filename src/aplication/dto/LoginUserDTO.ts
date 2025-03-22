/**
 * Data Transfer Object (DTO) para el inicio de sesión de usuarios.
 *
 * @interface LoginUserDTO
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario.
 */
export interface LoginUserDTO {
    email: string;
    password: string;
}
