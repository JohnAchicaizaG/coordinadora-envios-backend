/**
 * @swagger
 * tags:
 *   name: Órdenes
 *   description: Endpoints relacionados con la creación y gestión de órdenes de envío
 */

/**
 * @swagger
 * /api/orders/create:
 *   post:
 *     summary: Crear una nueva orden de envío
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderDTO'
 *     responses:
 *       201:
 *         description: Orden creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Orden creada con éxito
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *       400:
 *         description: Error de validación o dirección inválida
 *       401:
 *         description: Usuario no autenticado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOrderDTO:
 *       type: object
 *       required:
 *         - weight
 *         - dimensions
 *         - productType
 *         - destinationAddress
 *       properties:
 *         weight:
 *           type: number
 *           example: 2.5
 *         dimensions:
 *           type: string
 *           example: "40x30x20"
 *         productType:
 *           type: string
 *           example: "Electrodoméstico"
 *         destinationAddress:
 *           type: string
 *           example: "Cra 10 #20-30, Bogotá"

 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         userId:
 *           type: number
 *           example: 42
 *         weight:
 *           type: number
 *           example: 2.5
 *         dimensions:
 *           type: string
 *           example: "40x30x20"
 *         productType:
 *           type: string
 *           example: "Electrodoméstico"
 *         destinationAddress:
 *           type: string
 *           example: "Cra 10 #20-30, Bogotá"
 *         status:
 *           type: string
 *           enum: [pending, in_transit, delivered]
 *           example: pending
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-03-22T10:00:00Z"
 */
