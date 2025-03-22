import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { logger } from "./logger";
import chalk from "chalk";

dotenv.config();

/**
 * Pool de conexiones a la base de datos MySQL, utilizando variables de entorno.
 *
 * @const {Pool} db - Instancia del pool de conexiones de MySQL.
 */
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

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
