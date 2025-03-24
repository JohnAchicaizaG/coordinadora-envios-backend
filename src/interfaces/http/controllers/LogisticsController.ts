import { Request, Response } from "express";
import { CreateTransporter } from "@/aplication/use-cases/CreateTransporter";
import { TransporterRepository } from "@/infrastructure/database/repositories/TransporterRepository";
import { successResponse } from "@/shared/helpers/response";
import { handleControllerError } from "@/shared/helpers/handleControllerError";
import { RouteRepository } from "@/infrastructure/database/repositories/RouteRepository";
import { CreateRoute } from "@/aplication/use-cases/CreateRoute";

const transporterRepo = new TransporterRepository();
const routeRepo = new RouteRepository();

/**
 * Controlador que maneja las operaciones relacionadas con la logística
 * incluyendo transportistas y rutas
 */
export class LogisticsController {
    /**
     * Obtiene todos los transportistas registrados en el sistema
     * @param req - Objeto Request de Express
     * @param res - Objeto Response de Express
     * @returns Promise<void>
     */
    static async getAllTransporters(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const transporters = await transporterRepo.getAllTransporters();
            successResponse(res, "Transportistas obtenidos con éxito", {
                transporters,
            });
        } catch (error) {
            handleControllerError(
                res,
                error,
                "Error al obtener transportistas",
            );
        }
    }

    /**
     * Crea un nuevo transportista en el sistema
     * @param req - Objeto Request de Express con los datos del transportista
     * @param res - Objeto Response de Express
     * @returns Promise<void>
     */
    static async createTransporter(req: Request, res: Response): Promise<void> {
        try {
            const useCase = new CreateTransporter(transporterRepo);
            await useCase.execute(req.body);
            successResponse(res, "Transportista creado con éxito");
        } catch (error) {
            handleControllerError(res, error, "Error al crear transportista");
        }
    }

    /**
     * Obtiene todas las rutas registradas en el sistema
     * @param req - Objeto Request de Express
     * @param res - Objeto Response de Express
     * @returns Promise<void>
     */
    static async getAllRoutes(req: Request, res: Response): Promise<void> {
        try {
            const routes = await routeRepo.getAllRoutes();
            successResponse(res, "Rutas obtenidas con éxito", { routes });
        } catch (error) {
            handleControllerError(res, error, "Error al obtener rutas");
        }
    }

    /**
     * Crea una nueva ruta en el sistema
     * @param req - Objeto Request de Express con los datos de la ruta
     * @param res - Objeto Response de Express
     * @returns Promise<void>
     */
    static async createRoute(req: Request, res: Response): Promise<void> {
        try {
            const useCase = new CreateRoute(routeRepo);
            await useCase.execute(req.body);
            successResponse(res, "Ruta creada con éxito");
        } catch (error) {
            handleControllerError(res, error, "Error al crear ruta");
        }
    }
}
