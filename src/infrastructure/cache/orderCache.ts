import { redisClient } from "@/config/redis";

export const setOrderStatusInCache = async (
    orderId: number,
    status: string,
): Promise<void> => {
    await redisClient.set(`order:${orderId}:status`, status);
};
