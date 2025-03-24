import { CreateRouteDTO } from "@/aplication/dto/CreateRouteDTO";
import { IRouteRepository } from "@/domain/interfaces/IRouteRepository";

/**
 * Clase que maneja la creación de rutas en el sistema
 */
export class CreateRoute {
    /**
     * Crea una instancia de CreateRoute
     * @param {IRouteRepository} repo - Repositorio para operaciones con rutas
     */
    constructor(private readonly repo: IRouteRepository) {}

    /**
     * Ejecuta la creación de una nueva ruta
     * @param {CreateRouteDTO} data - Datos necesarios para crear la ruta
     * @returns {Promise<void>} Promesa que se resuelve cuando la ruta se crea exitosamente
     */
    async execute(data: CreateRouteDTO): Promise<void> {
        await this.repo.createRoute(data);
    }
}
