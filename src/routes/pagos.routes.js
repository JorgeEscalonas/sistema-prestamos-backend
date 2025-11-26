/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Gestión completa de pagos de préstamos
 */

/**
 * @swagger
 * /pagos:
 *   post:
 *     summary: Registrar un nuevo pago
 *     description: Registra un pago para un préstamo y actualiza automáticamente el saldo pendiente
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prestamoId
 *               - monto
 *             properties:
 *               prestamoId:
 *                 type: integer
 *                 description: ID del préstamo al que se aplica el pago
 *                 example: 1
 *               monto:
 *                 type: number
 *                 format: float
 *                 description: Monto del pago realizado
 *                 example: 250.00
 *               fechaPago:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha del pago (opcional, por defecto fecha actual)
 *                 example: "2024-11-24T21:00:00Z"
 *     responses:
 *       201:
 *         description: Pago registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pago registrado exitosamente"
 *                 pago:
 *                   $ref: '#/components/schemas/Pago'
 *       400:
 *         description: Datos inválidos o monto excede saldo pendiente
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
 *   get:
 *     summary: Listar todos los pagos
 *     description: Obtiene la lista completa de todos los pagos registrados
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pagos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pago'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /pagos/prestamo/{prestamoId}:
 *   get:
 *     summary: Listar pagos por préstamo
 *     description: Obtiene todos los pagos realizados para un préstamo específico
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: prestamoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del préstamo
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de pagos del préstamo obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pago'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Préstamo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /pagos/pago/{id}:
 *   get:
 *     summary: Obtener un pago específico
 *     description: Obtiene los detalles de un pago por su ID
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *         example: 1
 *     responses:
 *       200:
 *         description: Pago obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pago'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /pagos/{id}:
 *   put:
 *     summary: Actualizar un pago
 *     description: Modifica los datos de un pago existente
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto:
 *                 type: number
 *                 format: float
 *                 description: Nuevo monto del pago
 *                 example: 300.00
 *               fechaPago:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha del pago
 *                 example: "2024-11-25T10:00:00Z"
 *     responses:
 *       200:
 *         description: Pago actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pago actualizado exitosamente"
 *                 pago:
 *                   $ref: '#/components/schemas/Pago'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Eliminar un pago
 *     description: Elimina un pago del sistema y actualiza el saldo del préstamo
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Pago eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pago eliminado exitosamente"
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */

import { Router } from "express";
import {
  crearPago,
  obtenerPagosPorPrestamo,
  obtenerTodosPagos,
  obtenerPagoPorId,
  actualizarPago,
  eliminarPago
} from "../controllers/pagos.controller.js";
import { pagoValidator } from "../validators/pago.validator.js";
import { handleValidation } from "../middlewares/handleValidation.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", pagoValidator, handleValidation, crearPago);
router.get("/", obtenerTodosPagos);
router.get("/pago/:id", obtenerPagoPorId);
router.get("/prestamo/:prestamoId", obtenerPagosPorPrestamo);
router.put("/:id", actualizarPago);
router.delete("/:id", eliminarPago);

export default router;