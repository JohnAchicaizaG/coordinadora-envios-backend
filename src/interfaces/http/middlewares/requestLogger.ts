import morgan from "morgan";
import { logger } from "@/config/logger";

/**
 * Middleware de logging para solicitudes HTTP, utilizando `morgan` en modo desarrollo.
 *
 * Redirige los mensajes de log al sistema de logging personalizado (`pino`).
 *
 * @const {RequestHandler} requestLogger - Middleware de `morgan` configurado para registrar solicitudes HTTP.
 *
 * @example
 * app.use(requestLogger);
 */
const requestLogger = morgan("dev", {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
});

export default requestLogger;
