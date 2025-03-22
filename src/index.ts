import { logger } from "@/config/logger";
import app from "./app";

const PORT = process.env.PORT || 3000;

/**
 * Punto de entrada principal de la aplicación.
 *
 * Inicia el servidor Express en el puerto especificado y muestra un mensaje
 * de confirmación en consola usando el logger configurado.
 *
 * @const {number|string} PORT - Puerto en el que se inicia el servidor (por defecto: 3000).
 */
app.listen(PORT, () => {
    logger.info(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
