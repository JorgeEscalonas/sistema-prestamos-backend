import { Router } from "express";
import { 
  crearPago, 
  obtenerPagosPorPrestamo, 
  obtenerTodosPagos,
  obtenerPagoPorId,
  actualizarPago,
  eliminarPago
} from "../controllers/pagos.controller.js";

const router = Router();

// Crear pago
router.post("/", crearPago);

// Obtener todos los pagos
router.get("/", obtenerTodosPagos);

// Obtener pago por ID
router.get("/pago/:id", obtenerPagoPorId);

// Obtener pagos por préstamo
router.get("/prestamo/:prestamoId", obtenerPagosPorPrestamo);

// Actualizar pago
router.put("/:id", actualizarPago);

// Eliminar pago
router.delete("/:id", eliminarPago);

export default router;