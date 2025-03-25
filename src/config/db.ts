import "dotenv/config";
import mysql from "mysql2/promise";
import { logger } from "./logger";
import chalk from "chalk";

/**
 * Pool de conexiones a la base de datos MySQL, utilizando variables de entorno.
 *
 * @const {Pool} db - Instancia del pool de conexiones de MySQL.
 */
export const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || "task_manager",
    user: process.env.DB_USER || "task_user",
    password: process.env.DB_PASSWORD || "taskPass456",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

console.log(process.env.DB_NAME);
/**
 * Verifica la conexión inicial a la base de datos.
 * Si la conexión falla, se registra el error y se detiene el proceso.
 */
db.getConnection()
    .then((conn) => {
        conn.release(); // Liberamos la conexión al pool
        logger.info(chalk.greenBright("✅ Conectado a la base de datos MySQL"));
    })
    .catch((err) => {
        logger.error(
            chalk.redBright("❌ Error al conectar a la base de datos"),
        );
        logger.error(err);
        process.exit(1); // Detiene la aplicación si no hay conexión con la base de datos
    });
