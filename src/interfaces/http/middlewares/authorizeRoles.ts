import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./isAuthenticated";
import { HttpError } from "@/shared/errors/HttpError";
import { Role } from "@/domain/enums/Role";

/**
 * Middleware que permite el acceso solo a los usuarios con ciertos roles.
 *
 * @function authorizeRoles
 * @param {...Role[]} allowedRoles - Lista de roles permitidos para acceder al recurso.
 * @returns {(req: AuthenticatedRequest, res: Response, next: NextFunction) => void}
 * Middleware que verifica si el usuario autenticado tiene uno de los roles permitidos.
 *
 * @throws {HttpError} 401 - Si el usuario no está autenticado.
 * @throws {HttpError} 403 - Si el usuario no tiene los permisos necesarios.
 *
 * @example
 * app.get('/admin', authorizeRoles(Role.Admin), handler);
 */
export function authorizeRoles(...allowedRoles: Role[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            throw new HttpError(401, "No autenticado");
        }

        if (!allowedRoles.includes(user.role)) {
            throw new HttpError(403, "Acceso denegado: permiso insuficiente");
        }

        next();
    };
}
