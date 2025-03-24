import { db } from "@/config/db";
import { CreateRouteDTO } from "@/aplication/dto/CreateRouteDTO";
import { IRouteRepository } from "@/domain/interfaces/IRouteRepository";
import { Route } from "@/domain/entities/Route";

/**
 * Implementación del repositorio de rutas que maneja las operaciones de base de datos
 * relacionadas con las rutas del sistema.
 * @implements {IRouteRepository}
 */
export class RouteRepository implements IRouteRepository {
    /**
     * Crea una nueva ruta en la base de datos
     * @param {CreateRouteDTO} data - Los datos de la ruta a crear
     * @returns {Promise<void>} Una promesa que se resuelve cuando la ruta se crea exitosamente
     */
    async createRoute(data: CreateRouteDTO): Promise<void> {
        await db.query("INSERT INTO routes (name) VALUES (?)", [data.name]);
    }

    /**
     * Obtiene todas las rutas almacenadas en la base de datos
     * @returns {Promise<Route[]>} Una promesa que resuelve a un array de rutas ordenadas por fecha de creación descendente
     */
    async getAllRoutes(): Promise<Route[]> {
        const [rows] = await db.query(
            "SELECT * FROM routes ORDER BY created_at DESC",
        );
        return rows as Route[];
    }
}
