// src/routes/prestamo.routes.js
import { Router } from "express";
import {
  crearPrestamo,
  obtenerPrestamos,
  editarPrestamo,
  eliminarPrestamo
} from "../controllers/prestamo.controller.js";
import { prestamoValidator } from "../validators/prestamo.validator.js";
import { handleValidation } from "../middlewares/handleValidation.js";

const router = Router();

router.post("/", prestamoValidator, handleValidation, crearPrestamo);
router.get("/", obtenerPrestamos);
router.put("/:id", editarPrestamo);
router.delete("/:id", eliminarPrestamo);

export default router;
