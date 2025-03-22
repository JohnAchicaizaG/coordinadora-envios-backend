import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateSchema } from "../middlewares/validateSchema";
import { registerUserSchema } from "@/aplication/validators/registerUserSchema";
import { loginUserSchema } from "@/aplication/validators/loginUserSchema";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { Role } from "@/domain/enums/Role";

/**
 * Rutas relacionadas con la autenticación de usuarios.
 *
 * @const {Router} authRoutes - Router de Express que maneja registro, login y rutas protegidas.
 */
export const authRoutes = Router();

/**
 * @route POST /register
 * @description Registra un nuevo usuario.
 * @middleware validateSchema(registerUserSchema) - Valida los datos del cuerpo de la solicitud.
 * @controller AuthController.register
 */
authRoutes.post(
    "/register",
    validateSchema(registerUserSchema),
    AuthController.register,
);

/**
 * @route POST /login
 * @description Autentica a un usuario y devuelve un token.
 * @middleware validateSchema(loginUserSchema) - Valida los datos del cuerpo de la solicitud.
 * @controller AuthController.login
 */
authRoutes.post(
    "/login",
    validateSchema(loginUserSchema),
    AuthController.login,
);

//TODO:Prueba de roles autorizados en las proximas rutas (ELIMINAR)
/**
 * @route GET /prueba
 * @description Ruta protegida solo accesible para usuarios autenticados con rol ADMIN.
 * @middleware isAuthenticated - Verifica token JWT.
 * @middleware authorizeRoles(Role.Admin) - Verifica rol de acceso.
 * @returns {JSON} Mensaje de acceso permitido.
 */
authRoutes.get(
    "/prueba",
    isAuthenticated,
    authorizeRoles(Role.Admin),
    (req, res) => {
        res.json({
            success: true,
            message: "✅ ¡Acceso permitido! Estás autenticado como ADMIN.",
        });
    },
);
