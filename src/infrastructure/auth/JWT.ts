import jwt, { JwtPayload as JwtPayloadBase } from "jsonwebtoken";
import { Role } from "@/domain/enums/Role";

/**
 * Payload personalizado que extiende el estándar de JWT.
 *
 * @interface JwtPayload
 * @extends {JwtPayloadBase}
 * @property {number} id - ID del usuario.
 * @property {Role} role - Rol del usuario.
 */
export interface JwtPayload extends JwtPayloadBase {
    id: number;
    role: Role;
}

const ACCESS_SECRET = process.env.JWT_SECRET || "access_secret";

/**
 * Genera un token JWT con el payload especificado.
 *
 * @param {JwtPayload} payload - Datos a incluir en el token (ID y rol del usuario).
 * @returns {string} Token firmado con validez de 1 día.
 */
export function generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1d" });
}

/**
 * Verifica y decodifica un token JWT.
 *
 * @param {string} token - Token JWT a verificar.
 * @returns {JwtPayload} Payload decodificado si el token es válido.
 * @throws {Error} Si el token es inválido o ha expirado.
 */
export function verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}
