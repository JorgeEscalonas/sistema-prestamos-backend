import { Router } from "express";
import authRouter from "./auth.routes.js";
import clienteRouter from "./cliente.routes.js";
import tasaRouter from "./tasa.routes.js";
import prestamoRouter from "./prestamo.routes.js";
import paymentRoutes from "./pagos.routes.js";

const router = Router();

router.use("/auth", authRouter);

router.get("/", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
})

router.use("/clientes", clienteRouter);
router.use("/tasas", tasaRouter);
router.use("/prestamos", prestamoRouter);
router.use("/pagos", paymentRoutes);

export default router;