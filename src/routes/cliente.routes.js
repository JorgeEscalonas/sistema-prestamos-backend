/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gestión completa de clientes del sistema de préstamos
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Registra un nuevo cliente en el sistema con sus datos personales
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *           example:
 *             nombre: "Juan Pérez"
 *             cedula: "V-12345678"
 *             telefono: "+58 412-1234567"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cliente creado exitosamente"
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos inválidos o cédula duplicada
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
 *     summary: Listar todos los clientes
 *     description: Obtiene la lista completa de clientes registrados en el sistema
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar datos de un cliente
 *     description: Modifica la información de un cliente existente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *           example:
 *             nombre: "Juan Pérez Actualizado"
 *             cedula: "V-12345678"
 *             telefono: "+58 424-7654321"
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cliente actualizado exitosamente"
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cliente no encontrado"
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Eliminar un cliente
 *     description: Elimina un cliente del sistema (solo si no tiene préstamos asociados)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cliente eliminado exitosamente"
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */


import { Router } from "express";
import {
  crearCliente,
  obtenerClientes,
  editarCliente,
  eliminarCliente
} from "../controllers/cliente.controller.js";
import { clienteValidator } from "../validators/cliente.validator.js";
import { handleValidation } from "../middlewares/handleValidation.js";
// import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// router.use(authenticate); // ← Activa si quieres proteger todo

router.post("/", clienteValidator, handleValidation, crearCliente);
router.get("/", obtenerClientes);
router.put("/:id", clienteValidator, handleValidation, editarCliente);
router.delete("/:id", eliminarCliente);

export default router;
