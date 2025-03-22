import { Request, Response } from "express";
import { UserRepository } from "../../../infrastructure/database/repositories/UserRepository";
import { RegisterUser } from "@/aplication/use-cases/RegisterUser";
import { LoginUser } from "@/aplication/use-cases/LoginUser";
import { successResponse } from "@/shared/helpers/response";
import { handleControllerError } from "@/shared/helpers/handleControllerError";

const repo = new UserRepository();

/**
 * Controlador para la autenticación de usuarios.
 * Contiene los métodos para el registro y login.
 *
 * @class AuthController
 */
export class AuthController {
    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param {Request} req - Objeto de solicitud HTTP, debe contener los datos del usuario en `req.body`.
     * @param {Response} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>}
     *
     * @example
     * POST /api/auth/register
     * body: { email, password, role? }
     */
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const useCase = new RegisterUser(repo);
            const user = await useCase.execute(req.body);

            successResponse(res, "Usuario registrado con éxito", { user }, 201);
        } catch (err: unknown) {
            handleControllerError(
                res,
                err,
                "No se pudo registrar el usuario",
                400,
            );
        }
    }

    /**
     * Inicia sesión de un usuario existente.
     *
     * @param {Request} req - Objeto de solicitud HTTP, debe contener `email` y `password` en `req.body`.
     * @param {Response} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>}
     *
     * @example
     * POST /api/auth/login
     * body: { email, password }
     */
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const useCase = new LoginUser(repo);
            const result = await useCase.execute(req.body);

            successResponse(res, "Login exitoso", result);
        } catch (err: unknown) {
            handleControllerError(res, err, "No se pudo iniciar sesión", 401);
        }
    }
}
