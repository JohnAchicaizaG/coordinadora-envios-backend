import pino from "pino";

/**
 * Instancia del logger utilizando Pino con configuración para entorno de desarrollo y producción.
 *
 * @const {Logger} logger - Logger configurado para mostrar salida legible en consola.
 *
 * Configuración:
 * - Usa `pino-pretty` como transporte para formatear la salida.
 * - Colorea la salida en consola (`colorize: true`).
 * - Traduce la marca de tiempo al formato "HH:MM:ss".
 * - Ignora los campos `pid` y `hostname`.
 * - El nivel de log depende del entorno: `info` para producción, `debug` para otros entornos.
 */
export const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
        },
    },
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
});
