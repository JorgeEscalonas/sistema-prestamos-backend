/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación y gestión de usuarios
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea una nueva cuenta de usuario en el sistema (admin u operador). Solo administradores pueden crear nuevos usuarios.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - cedula
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del usuario
 *                 example: "Admin Principal"
 *               cedula:
 *                 type: string
 *                 description: Cédula de identidad (única)
 *                 example: "V-87654321"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *                 example: "password123"
 *               rol:
 *                 type: string
 *                 enum: [admin, operador]
 *                 description: Rol del usuario (opcional, por defecto 'admin')
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado exitosamente"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: "Admin Principal"
 *                     cedula:
 *                       type: string
 *                       example: "V-87654321"
 *                     rol:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: Datos inválidos o cédula duplicada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado - Token inválido o ausente
 *       403:
 *         description: Acceso denegado - Solo administradores pueden crear usuarios
 *       500:
 *         description: Error interno del servidor
 *
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             cedula: "V-87654321"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credenciales incorrectas"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor
 */


import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { registroValidator, loginValidator } from "../validators/auth.validator.js";
import { handleValidation } from "../middlewares/handleValidation.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Solo administradores pueden registrar nuevos usuarios
router.post("/register", authenticate, authorize(["admin"]), registroValidator, handleValidation, register);

// Login es público
router.post("/login", loginValidator, handleValidation, login);

export default router;
