// src/routes/cliente.routes.js
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
