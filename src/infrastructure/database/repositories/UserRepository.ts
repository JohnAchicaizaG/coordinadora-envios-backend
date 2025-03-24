import { db } from "../../../config/db";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { User } from "../../../domain/entities/User";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Role } from "@/domain/enums/Role";
import { RegisterUserDTO } from "@/aplication/dto/RegisterUserDTO";

/**
 * Representación de un usuario en la base de datos con compatibilidad para MySQL.
 *
 * @interface DbUser
 * @extends {User}
 * @extends {RowDataPacket}
 */
interface DbUser extends User, RowDataPacket {}

/**
 * Implementación de la interfaz IUserRepository utilizando MySQL.
 *
 * @class UserRepository
 * @implements {IUserRepository}
 */
export class UserRepository implements IUserRepository {
    /**
     * Busca un usuario por su correo electrónico en la base de datos.
     *
     * @param {string} email - Correo electrónico del usuario a buscar.
     * @returns {Promise<User | null>} Usuario encontrado o `null` si no existe.
     */
    async findByEmail(email: string): Promise<User | null> {
        const [rows] = await db.query<DbUser[]>(
            "SELECT * FROM users WHERE email = ?",
            [email],
        );
        return rows[0] || null;
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     *
     * @param {RegisterUserDTO} data - Datos del usuario a registrar.
     * @returns {Promise<User>} Usuario recién creado, incluyendo su ID generado.
     */
    async createUser(data: RegisterUserDTO): Promise<User> {
        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            [data.email, data.password, data.role || Role.User],
        );
        return {
            id: result.insertId,
            email: data.email,
            password: data.password,
            role: data.role || Role.User,
        };
    }
}
