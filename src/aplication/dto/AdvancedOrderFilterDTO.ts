/**
 * DTO para filtrar órdenes con criterios avanzados
 * @interface AdvancedOrderFilterDTO
 */
export interface AdvancedOrderFilterDTO {
    /** Estado de la orden */
    status?: string;
    /** Fecha de inicio para el filtro */
    startDate?: string;
    /** Fecha de fin para el filtro */
    endDate?: string;
    /** ID del transportador */
    transporterId?: number;
    /** ID de la ruta */
    routeId?: number;
}
