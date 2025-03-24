/**
 * DTO (Data Transfer Object) para la creación de un transportador
 * @interface CreateTransporterDTO
 */
export interface CreateTransporterDTO {
    /** Nombre del transportador */
    name: string;
    /** Capacidad de carga del transportador en unidades */
    capacity: number;
    /** Estado de disponibilidad del transportador. Por defecto es TRUE */
    available?: boolean;
}
