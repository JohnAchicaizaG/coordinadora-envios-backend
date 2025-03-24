/**
 * Punto de entrada principal de la aplicación.
 * Configura y ejecuta el servidor HTTP con soporte para WebSocket y Redis.
 *
 * @module index
 */

import { logger } from "@/config/logger";
import app from "./app";
import http from "http";
import { initSocket } from "./config/socket";
import { connectRedis } from "./config/redis";
import chalk from "chalk";

/**
 * Puerto en el que se ejecutará el servidor.
 * Se obtiene de las variables de entorno o usa 4000 como valor predeterminado.
 * @const {number} PORT
 */
const PORT = process.env.PORT || 4000;

/**
 * Servidor HTTP creado con Express y configurado para WebSocket.
 * @const {http.Server} server
 */
const server = http.createServer(app);

//  Iniciamos Socket.IO con el servidor
initSocket(server);

//  Conectamos Redis
connectRedis();

server.listen(PORT, () => {
    logger.info(
        chalk.yellowBright(
            `✅ Servidor + WebSocket corriendo en http://localhost:${PORT}`,
        ),
    );
});
