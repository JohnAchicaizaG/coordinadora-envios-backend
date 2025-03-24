import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { orderRoutes } from "./order.routes";
import { logisticsRoutes } from "./logistics.routes";

/**
 * Router principal que agrupa todas las rutas de la API.
 *
 * @const {Router} routes - Router que organiza los endpoints por módulos.
 *
 * @example
 * /auth → Rutas relacionadas con autenticación de usuarios.
 */
export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/orders", orderRoutes);
routes.use("/logistics", logisticsRoutes);
