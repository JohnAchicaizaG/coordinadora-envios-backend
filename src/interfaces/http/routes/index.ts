// src/interfaces/http/routes/index.ts
import { Router } from "express";
import { authRoutes } from "./auth.routes";

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
