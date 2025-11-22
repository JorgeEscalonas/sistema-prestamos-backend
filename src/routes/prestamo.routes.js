// src/routes/prestamo.routes.js
import { Router } from "express";
import {
  crearPrestamo,
  obtenerPrestamos,
  editarPrestamo,
  eliminarPrestamo
} from "../controllers/prestamo.controller.js";

const router = Router();

router.post("/", crearPrestamo);
router.get("/", obtenerPrestamos);
router.put("/:id", editarPrestamo);
router.delete("/:id", eliminarPrestamo);

export default router;
