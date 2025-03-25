/**
 * Interfaz que representa las métricas de rendimiento de un transportador
 */
export interface TransporterPerformanceMetric {
    /** ID único del transportador */
    transporterId: number;
    /** Nombre del transportador */
    transporterName: string;
    /** Número total de pedidos entregados */
    deliveredCount: number; // alias: totalDeliveredOrders
    /** Tiempo promedio de entrega en minutos */
    avgDeliveryTimeMinutes: number;
    /** Tiempo promedio de entrega en horas */
    averageDeliveryTimeHours: number;
    /** Número total de pedidos entregados (alias de deliveredCount) */
    totalDeliveredOrders: number;
}
