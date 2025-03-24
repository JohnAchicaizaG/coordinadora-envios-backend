import { Role } from "../enums/Role";

/**
 * Interfaz que representa un pedido detallado en el sistema.
 * Contiene toda la información necesaria para el procesamiento y seguimiento de un pedido.
 */
export interface DetailedOrder {
    /** Identificador único del pedido */
    orderId: number;
    /** Dirección de origen del pedido */
    originAddress: string;
    /** Peso del paquete en kilogramos */
    weight: number;
    /** Dimensiones del paquete (largo x ancho x alto) */
    dimensions: string;
    /** Tipo de producto que se está transportando */
    productType: string;
    /** Dirección de destino del pedido */
    destination: string;
    /** Estado actual del pedido */
    status: Role;
    /** Fecha y hora de creación del pedido */
    created_at: Date;
    /** Nombre de la ruta asignada al pedido (opcional) */
    routeName: string | null;
    /** Nombre del transportador asignado al pedido (opcional) */
    transporterName: string | null;
}
