import { Router } from "express";
import {
  generarPdfPendientes,
  generarPdfPagados,
  generarPdfGeneral,
} from "../controllers/pdf.controller.js";

const router = Router();

router.get("/pendientes", generarPdfPendientes);
router.get("/pagados", generarPdfPagados);
router.get("/general", generarPdfGeneral);

export default router;
