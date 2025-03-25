/**
 * @swagger
 * /api/orders/status/{orderId}:
 *   get:
 *     summary: Obtener el estado actual de una orden por su ID
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Estado de la orden obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     orderId:
 *                       type: number
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: pending
 *       404:
 *         description: Orden no encontrada
 *       401:
 *         description: Usuario no autenticado
 */


/**
 * @swagger
 * /api/orders/assign:
 *   post:
 *     summary: Asignar una ruta y un transportista a una orden
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - routeId
 *               - transporterId
 *             properties:
 *               orderId:
 *                 type: number
 *                 example: 1
 *               routeId:
 *                 type: number
 *                 example: 2
 *               transporterId:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Ruta asignada con éxito
 *       400:
 *         description: Error de validación o datos incorrectos
 *       401:
 *         description: Usuario no autenticado
 */




/**
 * @swagger
 * /api/orders/admin:
 *   get:
 *     summary: Obtener todas las órdenes de envío con detalles (admin)
 *     tags: [Órdenes]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_transit, delivered]
 *         description: Filtrar por estado (opcional)
 *     responses:
 *       200:
 *         description: Órdenes obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           orderId:
 *                             type: number
 *                             example: 1
 *                           weight:
 *                             type: number
 *                             example: 1.5
 *                           dimensions:
 *                             type: string
 *                             example: "30x20x15"
 *                           productType:
 *                             type: string
 *                             example: "Electrónica"
 *                           destination:
 *                             type: string
 *                             example: "Calle 123, Medellín"
 *                           status:
 *                             type: string
 *                             example: "pending"
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-03-23T14:00:00Z"
 *                           routeName:
 *                             type: string
 *                             example: "Ruta Norte"
 *                           transporterName:
 *                             type: string
 *                             example: "Juan Pérez"
 *       401:
 *         description: Usuario no autenticado
 */


/**
 * @swagger
 * /api/orders/create:
 *   post:
 *     summary: Crea una nueva orden de envío
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *               dimensions:
 *                 type: string
 *               productType:
 *                 type: string
 *               destinationAddress:
 *                 type: string
 *             required:
 *               - weight
 *               - dimensions
 *               - productType
 *               - destinationAddress
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 */


/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   patch:
 *     summary: Actualiza el estado de una orden
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in_transit, delivered]
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 */