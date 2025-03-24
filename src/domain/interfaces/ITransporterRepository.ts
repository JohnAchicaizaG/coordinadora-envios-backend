import { CreateTransporterDTO } from "@/aplication/dto/CreateTransporterDTO";

/**
 * Interfaz que define las operaciones del repositorio de transportadores.
 * Define los métodos necesarios para gestionar los transportadores en la capa de persistencia.
 *
 * @interface ITransporterRepository
 */
export interface ITransporterRepository {
    /**
     * Crea un nuevo transportador en el sistema.
     *
     * @param {CreateTransporterDTO} data - Datos del transportador a crear
     * @returns {Promise<void>} Promesa que se resuelve cuando se completa la creación
     */
    createTransporter(data: CreateTransporterDTO): Promise<void>;

    /**
     * Obtiene todos los transportadores registrados en el sistema.
     *
     * @returns {Promise<any[]>} Lista de transportadores ordenados por fecha de creación descendente
     */
    getAllTransporters(): Promise<any[]>;
}
