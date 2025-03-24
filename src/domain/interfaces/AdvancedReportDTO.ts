/**
 * Interfaz que representa un reporte avanzado de una orden
 * @interface AdvancedReportDTO
 */
export interface AdvancedReportDTO {
    /** ID único de la orden */
    orderId: number;
    /** Dirección de origen de la entrega */
    originAddress: string;
    /** Dirección de destino de la entrega */
    destination: string;
    /** Estado actual de la orden */
    status: string;
    /** Nombre del transportador asignado a la orden */
    transporterName: string | null;
    /** Nombre de la ruta asignada a la orden */
    routeName: string | null;
    /** Tiempo de entrega estimado en minutos */
    deliveryTimeMinutes: number | null;
    /** Fecha y hora de creación del reporte */
    createdAt: Date;
}
