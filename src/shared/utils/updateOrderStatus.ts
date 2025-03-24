import { redisClient } from "@/config/redis";
import { getIO } from "@/config/socket";
import { db } from "@/config/db";

/**
 * Actualiza el estado de una orden en múltiples sistemas y notifica a los clientes conectados.
 *
 * @param {number} orderId - El ID de la orden a actualizar
 * @param {string} status - El nuevo estado de la orden
 * @returns {Promise<void>} Una promesa que se resuelve cuando todas las actualizaciones se han completado
 *
 * @example
 * await updateOrderStatus(123, "completed");
 */
export const updateOrderStatus = async (orderId: number, status: string) => {
    // 1. Actualizar estado en base de datos
    await db.query("UPDATE orders SET status = ? WHERE id = ?", [
        status,
        orderId,
    ]);

    // 2. Insertar en historial
    await db.query(
        "INSERT INTO order_status_history (order_id, status) VALUES (?, ?)",
        [orderId, status],
    );

    // 3. Guardar en Redis
    await redisClient.set(`order:${orderId}:status`, status);

    // 4. Emitir por socket
    getIO().emit("order:status", {
        orderId,
        status,
    });
};
