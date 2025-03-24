import { ITransporterRepository } from "@/domain/interfaces/ITransporterRepository";

/**
 * Caso de uso para obtener todos los transportadores
 * @class GetAllTransporters
 */
export class GetAllTransporters {
    /**
     * Crea una instancia de GetAllTransporters
     * @param {ITransporterRepository} repo - Repositorio de transportadores
     */
    constructor(private readonly repo: ITransporterRepository) {}

    /**
     * Ejecuta el caso de uso para obtener todos los transportadores
     * @returns {Promise<any>} Lista de transportadores
     */
    async execute() {
        return this.repo.getAllTransporters();
    }
}
