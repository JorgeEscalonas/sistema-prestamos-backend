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
 *                 totalRecaudado:
 *                   type: number
 *                   format: float
 *                   description: Total de dinero realmente ingresado a caja (suma de pagos)
 *                   example: 10000.00
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

/**
 * @swagger
 * /estado-cuenta/metricas-mensuales:
 *   get:
 *     summary: Obtener métricas de crecimiento mensual
 *     description: Retorna la cantidad de nuevos clientes y préstamos del mes actual, junto con el porcentaje de crecimiento respecto al mes anterior.
 *     tags: [Estado de Cuenta]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Métricas calculadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientes:
 *                   type: object
 *                   properties:
 *                     cantidad:
 *                       type: integer
 *                       description: Nuevos clientes registrados este mes
 *                       example: 12
 *                     porcentaje:
 *                       type: number
 *                       format: float
 *                       description: Variación porcentual vs mes anterior
 *                       example: 20.5
 *                     mesAnterior:
 *                       type: integer
 *                       description: Cantidad registrada el mes pasado
 *                       example: 10
 *                 prestamos:
 *                   type: object
 *                   properties:
 *                     cantidad:
 *                       type: integer
 *                       description: Nuevos préstamos otorgados este mes
 *                       example: 5
 *                     porcentaje:
 *                       type: number
 *                       format: float
 *                       description: Variación porcentual vs mes anterior
 *                       example: -10.0
 *                     mesAnterior:
 *                       type: integer
 *                       description: Cantidad registrada el mes pasado
 *                       example: 8
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error calculando métricas
 */

/**
 * @swagger
 * /estado-cuenta/grafica-rentabilidad:
 *   get:
 *     summary: Datos para gráfica de Rentabilidad Anual (Barras)
 *     description: Retorna un array con el acumulado de inversión vs ganancia (intereses) para cada mes del año actual.
 *     tags: [Estado de Cuenta]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mes:
 *                     type: string
 *                     example: "Ene"
 *                   inversion:
 *                     type: number
 *                     description: Total prestado en ese mes (Capital)
 *                     example: 5000
 *                   ganancia:
 *                     type: number
 *                     description: Total de intereses generados en ese mes
 *                     example: 1200
 *       500:
 *         description: Error interno
 */

/**
 * @swagger
 * /estado-cuenta/grafica-flujo-caja:
 *   get:
 *     summary: Datos para gráfica de Flujo de Caja (Lineal)
 *     description: Retorna ingresos (pagos) vs egresos (préstamos) agrupados temporalmente.
 *     tags: [Estado de Cuenta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: periodo
 *         schema:
 *           type: string
 *           enum: [mensual, trimestral, anual]
 *         description: Periodo de agrupación (default mensual)
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   periodo:
 *                     type: string
 *                     example: "2024-01"
 *                   ingresos:
 *                     type: number
 *                     example: 3500
 *                   egresos:
 *                     type: number
 *                     example: 2000
 *       500:
 *         description: Error interno
 */

import { Router } from "express";
import {
  getPrestamosPendientes,
  getPrestamosPagados,
  getTotalesGenerales,
  getMetricasMensuales,
  getGraficaRentabilidadAnual,
  getGraficaFlujoCaja
} from "../controllers/estadoCuenta.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/pendientes", getPrestamosPendientes);
router.get("/pagados", getPrestamosPagados);
router.get("/totales", getTotalesGenerales);
router.get("/metricas-mensuales", getMetricasMensuales);
router.get("/grafica-rentabilidad", getGraficaRentabilidadAnual);
router.get("/grafica-flujo-caja", getGraficaFlujoCaja);

export default router;
