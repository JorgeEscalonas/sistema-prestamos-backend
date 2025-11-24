// src/routes/tasa.routes.js
import { Router } from "express";
import {
  crearTasa,
  obtenerTasas,
  editarTasa
} from "../controllers/tasa.controller.js";
import { tasaValidator } from "../validators/tasa.validator.js";
import { handleValidation } from "../middlewares/handleValidation.js";

const router = Router();

// router.use(authenticate); // Si quieres proteger con JWT

router.post("/", tasaValidator, handleValidation, crearTasa);
router.get("/", obtenerTasas);
router.put("/:id", tasaValidator, handleValidation, editarTasa);

export default router;
