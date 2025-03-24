import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { logger } from "./logger";

/** Instancia global del servidor Socket.IO */
let io: IOServer;

/**
 * Inicializa el servidor Socket.IO con la configuración necesaria
 * @param {HttpServer} server - Servidor HTTP de Express/Node
 * @returns {void}
 */
export const initSocket = (server: HttpServer): void => {
    io = new IOServer(server, {
        cors: {
            origin: "*", // o el dominio de tu frontend
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        logger.info("🟢 Cliente conectado:", socket.id);

        socket.on("disconnect", () => {
            logger.info("🔴 Cliente desconectado:", socket.id);
        });
    });
};

/**
 * Obtiene la instancia del servidor Socket.IO
 * @returns {IOServer} Instancia del servidor Socket.IO
 * @throws {Error} Si Socket.IO no ha sido inicializado
 */
export const getIO = (): IOServer => {
    if (!io) throw new Error("Socket.IO no ha sido inicializado");
    return io;
};
