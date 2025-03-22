import { RegisterUserDTO } from "../dto/RegisterUserDTO";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { hashPassword } from "../../shared/utils/hash";
import { HttpError } from "@/shared/errors/HttpError";

/**
 * Caso de uso para registrar un nuevo usuario.
 *
 * @class RegisterUser
 */
export class RegisterUser {
    /**
     * Crea una instancia de RegisterUser.
     *
     * @param {IUserRepository} userRepo - Repositorio de usuarios para interactuar con la base de datos.
     */
    constructor(private userRepo: IUserRepository) {}

    /**
     * Ejecuta el registro de un nuevo usuario.
     *
     * @param {RegisterUserDTO} data - Datos del usuario a registrar.
     * @returns {Promise<any>} Usuario recién creado.
     * @throws {HttpError} Si el correo ya se encuentra registrado.
     */
    async execute(data: RegisterUserDTO) {
        const existing = await this.userRepo.findByEmail(data.email);

        if (existing) {
            throw new HttpError(409, "El correo ya está registrado");
        }

        const hashed = await hashPassword(data.password);

        const newUser = await this.userRepo.createUser({
            ...data,
            password: hashed,
        });

        return newUser;
    }
}
