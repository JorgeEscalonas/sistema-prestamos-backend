// src/routes/tasa.routes.js
import { Router } from "express";
import {
  crearTasa,
  obtenerTasas,
  editarTasa
} from "../controllers/tasa.controller.js";

const router = Router();

// router.use(authenticate); // Si quieres proteger con JWT

router.post("/", crearTasa);
router.get("/", obtenerTasas);
router.put("/:id", editarTasa);

export default router;
