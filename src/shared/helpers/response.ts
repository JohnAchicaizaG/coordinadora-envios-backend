import { Response } from "express";

/**
 * Envía una respuesta HTTP exitosa con datos opcionales.
 *
 * @function successResponse
 * @param {Response} res - Objeto de respuesta de Express.
 * @param {string} message - Mensaje descriptivo del resultado exitoso.
 * @param {any} [data={}] - Datos adicionales que se incluyen en la respuesta.
 * @param {number} [status=200] - Código de estado HTTP.
 * @returns {Response} Respuesta HTTP con formato de éxito.
 */
export const successResponse = (
    res: Response,
    message: string,
    data: any = {},
    status: number = 200,
): Response => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};

/**
 * Envía una respuesta HTTP de error con mensaje y detalles opcionales.
 *
 * @function errorResponse
 * @param {Response} res - Objeto de respuesta de Express.
 * @param {string} message - Mensaje descriptivo del error.
 * @param {any} [errors={}] - Detalles adicionales del error (puede incluir errores de validación, etc.).
 * @param {number} [status=400] - Código de estado HTTP.
 * @returns {Response} Respuesta HTTP con formato de error.
 */
export const errorResponse = (
    res: Response,
    message: string,
    errors: any = {},
    status: number = 400,
): Response => {
    return res.status(status).json({
        success: false,
        message,
        errors,
    });
};
