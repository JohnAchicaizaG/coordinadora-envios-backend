import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "@/config/logger";

/**
 * Middleware global para el manejo centralizado de errores.
 *
 * Captura y responde adecuadamente ante:
 * - JSON malformado (SyntaxError)
 * - Errores de validación con Zod
 * - Errores personalizados (por ejemplo, HttpError)
 * - Errores inesperados del sistema
 *
 * @function errorHandler
 * @param {any} err - Objeto de error capturado.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @param {NextFunction} next - Función para pasar al siguiente middleware.
 *
 * @returns {void}
 */
export default function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    logger.error({
        msg: "🛑 Error detectado",
        method: req.method,
        path: req.originalUrl,
        body: req.body,
        error: {
            name: err.name,
            message: err.message,
            stack: err.stack,
        },
    });

    // JSON inválido (malformado)
    if (err instanceof SyntaxError && "body" in err) {
        res.status(400).json({
            success: false,
            message: "Invalid JSON payload",
            errors: null,
        });
        return;
    }

    // Errores de validación (Zod)
    if (err instanceof ZodError) {
        const formattedErrors = err.flatten().fieldErrors;

        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: formattedErrors,
        });
        return;
    }

    // Errores personalizados con status y message definidos
    if (err.status && err.message) {
        res.status(err.status).json({
            success: false,
            message: err.message,
            errors: err.errors || null,
        });
        return;
    }

    // Error inesperado
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: null,
    });
}
