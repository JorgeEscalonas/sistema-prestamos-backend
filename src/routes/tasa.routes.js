/**
 * @swagger
 * tags:
 *   name: Tasas
 *   description: Gestión de tasas del dólar para cálculo de préstamos
 */

/**
 * @swagger
 * /tasas:
 *   post:
 *     summary: Registrar una nueva tasa del dólar
 *     description: Registra el valor actual de la tasa del dólar en el sistema
 *     tags: [Tasas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - valor
 *             properties:
 *               valor:
 *                 type: number
 *                 format: float
 *                 description: Valor de la tasa del dólar
 *                 example: 36.50
 *               fecha:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de la tasa (opcional, por defecto fecha actual)
 *                 example: "2024-11-24T21:00:00Z"
 *     responses:
 *       201:
 *         description: Tasa registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tasa registrada exitosamente"
 *                 tasa:
 *                   $ref: '#/components/schemas/Tasa'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtener todas las tasas
 *     description: Lista todas las tasas del dólar registradas en el sistema
 *     tags: [Tasas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tasas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tasa'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tasas/{id}:
 *   put:
 *     summary: Actualizar una tasa
 *     description: Modifica el valor de una tasa del dólar existente
 *     tags: [Tasas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tasa a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 format: float
 *                 description: Nuevo valor de la tasa
 *                 example: 37.00
 *               fecha:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha de la tasa
 *                 example: "2024-11-25T10:00:00Z"
 *     responses:
 *       200:
 *         description: Tasa actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tasa actualizada exitosamente"
 *                 tasa:
 *                   $ref: '#/components/schemas/Tasa'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Tasa no encontrada
 *       500:
 *         description: Error interno del servidor
 */


import { Router } from "express";
import {
  crearTasa,
  obtenerTasas,
  editarTasa
} from "../controllers/tasa.controller.js";
import { tasaValidator } from "../validators/tasa.validator.js";
import { handleValidation } from "../middlewares/handleValidation.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", tasaValidator, handleValidation, crearTasa);
router.get("/", obtenerTasas);
router.put("/:id", tasaValidator, handleValidation, editarTasa);

export default router;
