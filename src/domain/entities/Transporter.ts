/**
 * Interfaz que representa un transportador en el sistema.
 *
 * @interface Transporter
 * @property {number} id - Identificador único del transportador
 * @property {string} name - Nombre del transportador
 * @property {number} capacity - Capacidad de carga del transportador
 * @property {boolean} available - Estado de disponibilidad del transportador
 * @property {Date} created_at - Fecha y hora de creación del transportador
 */
export interface Transporter {
    id: number;
    name: string;
    capacity: number;
    available: boolean;
    created_at: Date;
}
