import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar el cuerpo de una solicitud HTTP (`req.body`)
 * usando un esquema definido con Zod.
 *
 * Si la validación falla, el error es pasado al middleware de manejo de errores.
 *
 * @function validateSchema
 * @param {AnyZodObject} schema - Esquema Zod a utilizar para la validación.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Middleware de validación.
 *
 * @example
 * router.post("/login", validateSchema(loginUserSchema), loginController);
 */
export const validateSchema =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            next(err);
        }
    };
