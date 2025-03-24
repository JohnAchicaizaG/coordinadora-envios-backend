/**
 * Representa una ruta en el sistema.
 * @interface Route
 */
export interface Route {
    /** Identificador único de la ruta */
    id: number;
    /** Nombre descriptivo de la ruta */
    name: string;
    /** Capacidad máxima de la ruta */
    capacity: number;
    /** Fecha y hora de creación de la ruta */
    created_at: Date;
}
