/**
 * @swagger
 * tags:
 *   name: PDF
 *   description: Endpoints para la generación y descarga de reportes ejecutivos en formato PDF.
 */

/**
 * @swagger
 * /pdf/pendientes:
 *   get:
 *     summary: Reporte de Préstamos Pendientes
 *     description: >
 *       Genera y descarga un documento PDF que lista todos los préstamos activos con saldo pendiente.
 *       Incluye detalles del cliente, monto original otorgado, saldo actual por cobrar y fechas de registro.
 *       Ideal para gestión de cobranza y auditoría de cuentas por cobrar.
 *     tags: [PDF]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Archivo PDF generado exitosamente. La descarga comienza automáticamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Acceso denegado. Token de autenticación inválido o ausente.
 *       500:
 *         description: Error interno del servidor al intentar generar el reporte.
 */

/**
 * @swagger
 * /pdf/pagados:
 *   get:
 *     summary: Reporte de Préstamos Pagados
 *     description: >
 *       Genera y descarga un documento PDF con el historial completo de préstamos finalizados (pagados en su totalidad).
 *       Muestra el monto original, el total recaudado y las fechas de liquidación.
 *       Útil para control de ingresos y cierres de caja históricos.
 *     tags: [PDF]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Archivo PDF generado exitosamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Acceso denegado. Token de autenticación inválido o ausente.
 *       500:
 *         description: Error interno del servidor al intentar generar el reporte.
 */

/**
 * @swagger
 * /pdf/general:
 *   get:
 *     summary: Resumen General y Estadísticas del Sistema
 *     description: >
 *       Genera un reporte ejecutivo "Dashboard" en PDF.
 *       Presenta métricas clave del negocio: cantidad total de préstamos, comparación de pendientes vs pagados,
 *       capital total prestado y saldo total pendiente de recuperación.
 *     tags: [PDF]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumen ejecutivo generado exitosamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Acceso denegado. Token de autenticación inválido o ausente.
 *       500:
 *         description: Error interno del servidor al intentar generar el resumen.
 */

import { Router } from "express";
import {
  generarPdfPendientes,
  generarPdfPagados,
  generarPdfGeneral,
} from "../controllers/pdf.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/pendientes", generarPdfPendientes);
router.get("/pagados", generarPdfPagados);
router.get("/general", generarPdfGeneral);

export default router;
