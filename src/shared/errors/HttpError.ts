/**
 * Clase personalizada para representar errores HTTP con estado, mensaje y detalles opcionales.
 *
 * @class HttpError
 * @extends {Error}
 *
 * @property {number} status - Código de estado HTTP (ej. 400, 401, 404).
 * @property {any} errors - Detalles adicionales del error (opcional).
 */
export class HttpError extends Error {
    public readonly status: number;
    public readonly errors: any;

    /**
     * Crea una nueva instancia de HttpError.
     *
     * @param {number} status - Código de estado HTTP.
     * @param {string} message - Mensaje descriptivo del error.
     * @param {any} [errors] - Detalles adicionales del error (opcional).
     */
    constructor(status: number, message: string, errors?: any) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.errors = errors || null;
        Error.captureStackTrace(this, this.constructor);
    }
}
