/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nombre
 *         - cedula
 *         - telefono
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del cliente
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre completo del cliente
 *           example: "Juan Pérez"
 *         cedula:
 *           type: string
 *           description: Cédula de identidad (única)
 *           example: "V-12345678"
 *         telefono:
 *           type: string
 *           description: Número de teléfono del cliente
 *           example: "+58 412-1234567"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *
 *     Prestamo:
 *       type: object
 *       required:
 *         - clienteId
 *         - montoPrestado
 *         - porcentaje
 *         - tasaId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del préstamo
 *           example: 1
 *         clienteId:
 *           type: integer
 *           description: ID del cliente asociado
 *           example: 1
 *         montoPrestado:
 *           type: number
 *           format: float
 *           description: Monto inicial prestado
 *           example: 1000.00
 *         porcentaje:
 *           type: number
 *           format: float
 *           description: Porcentaje de interés aplicado
 *           example: 10.5
 *         montoTotal:
 *           type: number
 *           format: float
 *           description: Monto total a pagar (capital + intereses)
 *           example: 1105.00
 *         saldoPendiente:
 *           type: number
 *           format: float
 *           description: Saldo pendiente por pagar
 *           example: 500.00

 *         estado:
 *           type: string
 *           enum: [pendiente, pagado]
 *           description: Estado actual del préstamo
 *           example: "pendiente"
 *         fechaRegistro:
 *           type: string
 *           format: date-time
 *           description: Fecha de registro del préstamo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *
 *     Pago:
 *       type: object
 *       required:
 *         - prestamoId
 *         - monto
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del pago
 *           example: 1
 *         prestamoId:
 *           type: integer
 *           description: ID del préstamo asociado
 *           example: 1
 *         monto:
 *           type: number
 *           format: float
 *           description: Monto del pago realizado
 *           example: 250.00
 *         fechaPago:
 *           type: string
 *           format: date-time
 *           description: Fecha en que se realizó el pago
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *
 *     Tasa:
 *       type: object
 *       required:
 *         - valor
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado de la tasa
 *           example: 1
 *         valor:
 *           type: number
 *           format: float
 *           description: Valor de la tasa del dólar
 *           example: 36.50
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de registro de la tasa
 *
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - cedula
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del usuario
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre completo del usuario
 *           example: "Admin Principal"
 *         cedula:
 *           type: string
 *           description: Cédula de identidad (única)
 *           example: "V-87654321"
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario (hasheada)
 *           example: "password123"
 *         rol:
 *           type: string
 *           enum: [admin, operador]
 *           description: Rol del usuario en el sistema
 *           example: "admin"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - cedula
 *         - password
 *       properties:
 *         cedula:
 *           type: string
 *           description: Cédula del usuario
 *           example: "V-87654321"
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *           example: "password123"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Login exitoso"
 *         token:
 *           type: string
 *           description: Token JWT para autenticación
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         usuario:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             nombre:
 *               type: string
 *               example: "Admin Principal"
 *             cedula:
 *               type: string
 *               example: "V-87654321"
 *             rol:
 *               type: string
 *               example: "admin"
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error
 *           example: "Error al procesar la solicitud"
 *         errors:
 *           type: array
 *           description: Lista de errores de validación
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "cedula"
 *               message:
 *                 type: string
 *                 example: "La cédula es requerida"
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de éxito
 *           example: "Operación realizada exitosamente"
 */
