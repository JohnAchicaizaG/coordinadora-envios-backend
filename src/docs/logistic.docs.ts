/**
 * @swagger
 * tags:
 *   name: Logística
 *   description: Endpoints para rutas y transportistas
 */

/**
 * @swagger
 * /api/logistics/transporters:
 *   get:
 *     summary: Obtener todos los transportistas
 *     tags: [Logística]
 *     responses:
 *       200:
 *         description: Lista de transportistas
 */

/**
 * @swagger
 * /api/logistics/transporters:
 *   post:
 *     summary: Crear un nuevo transportista
 *     tags: [Logística]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               available:
 *                 type: boolean
 *             required:
 *               - name
 *               - capacity
 *     responses:
 *       201:
 *         description: Transportista creado
 */

/**
 * @swagger
 * /api/logistics/routes:
 *   get:
 *     summary: Obtener todas las rutas
 *     tags: [Logística]
 *     responses:
 *       200:
 *         description: Lista de rutas
 */

/**
 * @swagger
 * /api/logistics/routes:
 *   post:
 *     summary: Crear una nueva ruta
 *     tags: [Logística]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Ruta creada con éxito
 */
