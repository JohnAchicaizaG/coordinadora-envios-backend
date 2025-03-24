/**
 * Configuración y conexión a Redis
 * @module config/redis
 */

import { createClient } from "redis";
import { logger } from "./logger";
import chalk from "chalk";

/**
 * Cliente de Redis configurado con la URL proporcionada en las variables de entorno
 * o la URL por defecto local
 * @type {import('redis').RedisClientType}
 */
export const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});

/**
 * Establece la conexión con Redis y maneja los errores de conexión
 * @async
 * @function connectRedis
 * @throws {Error} Si la conexión a Redis falla
 * @returns {Promise<void>}
 */
export const connectRedis = async () => {
    try {
        await redisClient.connect();
        logger.info(chalk.redBright("✅ Redis conectado correctamente"));
    } catch (err) {
        logger.error("❌ Error al conectar con Redis:", err);
        process.exit(1);
    }
};
