/**
 * @swagger
 * tags:
 *   name: Prestamos
 *   description: Gestión completa de préstamos del sistema
 */

/**
 * @swagger
 * /prestamos:
 *   post:
 *     summary: Crear un nuevo préstamo
 *     description: Registra un nuevo préstamo para un cliente con cálculo automático de intereses
 *     tags: [Prestamos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteId
 *               - montoPrestado
 *               - porcentaje
 *               - tasaId
 *             properties:
 *               clienteId:
 *                 type: integer
 *                 description: ID del cliente que recibe el préstamo
 *                 example: 1
 *               montoPrestado:
 *                 type: number
 *                 format: float
 *                 description: Monto inicial del préstamo
 *                 example: 1000.00
 *               porcentaje:
 *                 type: number
 *                 format: float
 *                 description: Porcentaje de interés a aplicar
 *                 example: 10.5
 *               tasaId:
 *                 type: integer
 *                 description: ID de la tasa del dólar a utilizar
 *                 example: 1
 *     responses:
 *       201:
 *         description: Préstamo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Préstamo creado exitosamente"
 *                 prestamo:
 *                   $ref: '#/components/schemas/Prestamo'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Cliente o tasa no encontrados
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Listar todos los préstamos
 *     description: Obtiene la lista completa de préstamos con información de clientes
 *     tags: [Prestamos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de préstamos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prestamo'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /prestamos/{id}:
 *   put:
 *     summary: Actualizar un préstamo
 *     description: Modifica los datos de un préstamo existente
 *     tags: [Prestamos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del préstamo a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               montoPrestado:
 *                 type: number
 *                 format: float
 *                 example: 1500.00
 *               porcentaje:
 *                 type: number
 *                 format: float
 *                 example: 12.0
 *               estado:
 *                 type: string
 *                 enum: [pendiente, pagado]
 *                 example: "pendiente"
 *     responses:
 *       200:
 *         description: Préstamo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Préstamo actualizado exitosamente"
 *                 prestamo:
 *                   $ref: '#/components/schemas/Prestamo'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Préstamo no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Eliminar un préstamo
 *     description: Elimina un préstamo del sistema (solo si no tiene pagos asociados)
 *     tags: [Prestamos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del préstamo a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Préstamo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Préstamo eliminado exitosamente"
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Préstamo no encontrado
 *       500:
 *         description: Error interno del servidor
 */


import { Router } from "express";
import {
  crearPrestamo,
  obtenerPrestamos,
  editarPrestamo,
  eliminarPrestamo
} from "../controllers/prestamo.controller.js";
import { prestamoValidator } from "../validators/prestamo.validator.js";
import { handleValidation } from "../middlewares/handleValidation.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", prestamoValidator, handleValidation, crearPrestamo);
router.get("/", obtenerPrestamos);
router.put("/:id", editarPrestamo);
router.delete("/:id", eliminarPrestamo);

export default router;
