import { Response } from "express";
import { errorResponse } from "@/shared/helpers/response";
import { HttpError } from "../errors/HttpError";

/**
 * Manejador genérico de errores para controladores HTTP.
 *
 * Evalúa si el error es una instancia de `HttpError` o `Error`, y responde
 * con un mensaje y código de estado apropiado. Si el error no es reconocido,
 * utiliza un mensaje y estado por defecto.
 *
 * @function handleControllerError
 * @param {Response} res - Objeto de respuesta de Express.
 * @param {unknown} err - Error capturado, puede ser `HttpError`, `Error` u otro valor.
 * @param {string} fallbackMessage - Mensaje por defecto en caso de error desconocido.
 * @param {number} [fallbackStatus=500] - Código de estado HTTP por defecto.
 * @returns {Response} Respuesta HTTP con formato estandarizado de error.
 */
export function handleControllerError(
    res: Response,
    err: unknown,
    fallbackMessage: string,
    fallbackStatus = 500,
): Response {
    if (err instanceof HttpError) {
        return errorResponse(res, err.message, err.errors, err.status);
    }

    if (err instanceof Error) {
        return errorResponse(res, err.message, null, fallbackStatus);
    }

    return errorResponse(res, fallbackMessage, null, fallbackStatus);
}
