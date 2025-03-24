import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar una parte del request (body, query, params)
 * usando un esquema de Zod.
 *
 * @param {AnyZodObject} schema - Esquema de Zod
 * @param {"body" | "query" | "params"} location - Parte del request a validar (por defecto: "body")
 * @returns Middleware de validación
 */
export const validateSchema = (
    schema: AnyZodObject,
    location: "body" | "query" | "params" = "body",
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const result = schema.parse(req[location]);
            req[location] = result;
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    message: "Error de validación",
                    errors: err.errors,
                });
            } else {
                next(err);
            }
        }
    };
};
