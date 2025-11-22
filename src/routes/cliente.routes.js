// src/routes/cliente.routes.js
import { Router } from "express";
import {
  crearCliente,
  obtenerClientes,
  editarCliente,
  eliminarCliente
} from "../controllers/cliente.controller.js";
// import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// router.use(authenticate); // ← Activa si quieres proteger todo

router.post("/", crearCliente);
router.get("/", obtenerClientes);
router.put("/:id", editarCliente);
router.delete("/:id", eliminarCliente);

export default router;
