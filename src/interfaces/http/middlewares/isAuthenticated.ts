import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/infrastructure/auth/JWT";
import { HttpError } from "@/shared/errors/HttpError";
import { JwtPayload } from "@/infrastructure/auth/JWT";

/**
 * Extensión de la interfaz Request para incluir el payload del usuario autenticado.
 *
 * @interface AuthenticatedRequest
 * @extends {Request}
 * @property {JwtPayload} [user] - Información del usuario autenticado (extraída del token JWT).
 */
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

/**
 * Middleware que verifica si el usuario está autenticado mediante un token JWT válido.
 *
 * @function isAuthenticated
 * @param {AuthenticatedRequest} req - Objeto de solicitud extendido con posible `user`.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 *
 * @throws {HttpError} 401 - Si el token no está presente, no tiene el prefijo `Bearer`, es inválido o ha expirado.
 *
 * @example
 * app.get("/perfil", isAuthenticated, handler);
 */
export function isAuthenticated(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new HttpError(401, "Token de autenticación no proporcionado");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch {
        throw new HttpError(401, "Token inválido o expirado");
    }
}
