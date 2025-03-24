import { CreateRouteDTO } from "@/aplication/dto/CreateRouteDTO";

/**
 * Interfaz que define las operaciones del repositorio de rutas
 * @interface IRouteRepository
 */
export interface IRouteRepository {
    /**
     * Crea una nueva ruta en el sistema
     * @param {CreateRouteDTO} data - Los datos de la ruta a crear
     * @returns {Promise<void>} Promesa que se resuelve cuando la ruta se crea exitosamente
     */
    createRoute(data: CreateRouteDTO): Promise<void>;

    /**
     * Obtiene todas las rutas disponibles en el sistema
     * @returns {Promise<any[]>} Promesa que resuelve con un array de rutas
     */
    getAllRoutes(): Promise<any[]>;
}
