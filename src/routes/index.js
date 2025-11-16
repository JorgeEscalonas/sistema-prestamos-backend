import { Router } from "express";
import authRouter from "./auth.routes.js";

const router = Router();

router.use("/auth", authRouter);

router.get("/", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
})

export default router;