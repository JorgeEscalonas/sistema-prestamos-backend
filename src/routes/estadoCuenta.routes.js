/**
 * @swagger
 * tags:
 *   name: Estado de Cuenta
 *   description: Consulta de estados de cuenta y totales
 */

/**
 * @swagger
 * /estado-cuenta/pendientes:
 *   get:
 *     summary: Obtener préstamos pendientes
 *     description: Lista todos los préstamos con saldo pendiente y sus detalles
 *     tags: [Estado de Cuenta]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de préstamos pendientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prestamos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Prestamo'
 *                 totalPendiente:
 *                   type: number
 *                   format: float
 *                   description: Suma total de todos los saldos pendientes
 *                   example: 5000.00
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /estado-cuenta/pagados:
 *   get:
 *     summary: Obtener préstamos pagados
 *     description: Lista todos los préstamos que han sido completamente pagados
 *     tags: [Estado de Cuenta]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de préstamos pagados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prestamos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Prestamo'
 *                 totalPagado:
 *                   type: number
 *                   format: float
 *                   description: Suma total de todos los préstamos pagados
 *                   example: 15000.00
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /estado-cuenta/totales:
 *   get:
 *     summary: Obtener totales generales
 *     description: Obtiene un resumen con los totales de préstamos pendientes, pagados y general
 *     tags: [Estado de Cuenta]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Totales generales obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPrestado:
 *                   type: number
 *                   format: float
 *                   description: Total de dinero prestado
 *                   example: 20000.00
 *                 totalPagado:
 *                   type: number
 *                   format: float
 *                   description: Total de dinero pagado
 *                   example: 15000.00
 *                 totalPendiente:
 *                   type: number
 *                   format: float
 *                   description: Total de dinero pendiente por cobrar
 *                   example: 5000.00
 *                 cantidadPrestamosPendientes:
 *                   type: integer
 *                   description: Número de préstamos con saldo pendiente
 *                   example: 5
 *                 cantidadPrestamosPagados:
 *                   type: integer
 *                   description: Número de préstamos completamente pagados
 *                   example: 10
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */

import { Router } from "express";
import {
  getPrestamosPendientes,
  getPrestamosPagados,
  getTotalesGenerales,
} from "../controllers/estadoCuenta.controller.js";

const router = Router();

router.get("/pendientes", getPrestamosPendientes);
router.get("/pagados", getPrestamosPagados);
router.get("/totales", getTotalesGenerales);

export default router;
