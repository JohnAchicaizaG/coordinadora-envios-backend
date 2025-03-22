import { RegisterUserDTO } from "@/aplication/dto/RegisterUserDTO";
import { User } from "../entities/User";

/**
 * Interfaz para el repositorio de usuarios. Define los métodos que deben implementarse
 * para interactuar con la fuente de datos (base de datos, API externa).
 *
 * @interface IUserRepository
 */
export interface IUserRepository {
    /**
     * Busca un usuario por su correo electrónico.
     *
     * @param {string} email - Correo electrónico del usuario a buscar.
     * @returns {Promise<User | null>} Usuario encontrado o `null` si no existe.
     */
    findByEmail(email: string): Promise<User | null>;

    /**
     * Crea un nuevo usuario con los datos proporcionados.
     *
     * @param {RegisterUserDTO} data - Datos para registrar un nuevo usuario.
     * @returns {Promise<User>} Usuario creado.
     */
    createUser(data: RegisterUserDTO): Promise<User>;
}
