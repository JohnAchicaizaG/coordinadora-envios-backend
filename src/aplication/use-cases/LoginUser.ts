import { LoginUserDTO } from "../dto/LoginUserDTO";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { comparePassword } from "../../shared/utils/hash";
import { generateToken } from "../../infrastructure/auth/JWT";
import { Role } from "../../domain/enums/Role";
import { HttpError } from "@/shared/errors/HttpError";

/**
 * Caso de uso para iniciar sesión de un usuario.
 *
 * @class LoginUser
 */
export class LoginUser {
    /**
     * Crea una instancia de LoginUser.
     *
     * @param {IUserRepository} userRepo - Repositorio de usuarios que permite acceder a los datos persistidos.
     */
    constructor(private userRepo: IUserRepository) {}

    /**
     * Ejecuta el caso de uso de login.
     *
     * @param {LoginUserDTO} data - Datos del usuario para iniciar sesión (email y contraseña).
     * @returns {Promise<{ user: { id: string; email: string; role: Role }, accessToken: string }>}
     * Un objeto con los datos del usuario autenticado y el token de acceso.
     * @throws {HttpError} Si las credenciales son inválidas o el rol no es válido.
     */
    async execute(data: LoginUserDTO) {
        const user = await this.userRepo.findByEmail(data.email);

        const isPasswordValid =
            user && (await comparePassword(data.password, user.password));
        if (!isPasswordValid) {
            throw new HttpError(401, "Credenciales inválidas");
        }

        const { id, email, role } = user;

        if (!Object.values(Role).includes(role as Role)) {
            throw new HttpError(403, "Rol no válido");
        }

        const accessToken = generateToken({ id, role });

        return {
            user: { id, email, role },
            accessToken,
        };
    }
}
