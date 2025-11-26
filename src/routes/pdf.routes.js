/**
 * @swagger
 * tags:
 *   name: PDF
 *   description: Generación de reportes en PDF
 */

/**
 * @swagger
 * /pdf/pendientes:
 *   get:
 *     summary: Generar PDF de préstamos pendientes
 *     description: Genera un reporte en PDF con todos los préstamos que tienen saldo pendiente
 *     tags: [PDF]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error al generar el PDF
 */

/**
 * @swagger
 * /pdf/pagados:
 *   get:
 *     summary: Generar PDF de préstamos pagados
 *     description: Genera un reporte en PDF con todos los préstamos completamente pagados
 *     tags: [PDF]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error al generar el PDF
 */

/**
 * @swagger
 * /pdf/general:
 *   get:
 *     summary: Generar PDF de reporte general
 *     description: Genera un reporte en PDF con todos los préstamos del sistema (pendientes y pagados)
 *     tags: [PDF]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error al generar el PDF
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
