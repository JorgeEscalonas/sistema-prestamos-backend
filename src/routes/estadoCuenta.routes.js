import { Router } from "express";
import {
  getPrestamosPendientes,
  getPrestamosPagados,
  getTotalesGenerales,
} from "../controllers/estadoCuenta.controller.js";

const router = Router();

router.get("/pendientes", getPrestamosPendientes);
router.get("/pagados", getPrestamosPagados);
router.get("/totales", getTotalesGenerales);

export default router;
