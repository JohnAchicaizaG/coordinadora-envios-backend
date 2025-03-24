/**
 * DTO para asignar una ruta a un transportador para una orden específica
 * @interface AssignRouteDTO
 */
export interface AssignRouteDTO {
    /** ID único de la orden a asignar */
    orderId: number;
    /** ID de la ruta a asignar */
    routeId: number;
    /** ID del transportador al que se asignará la ruta */
    transporterId: number;
}
