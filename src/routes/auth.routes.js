// src/routes/auth.routes.js
import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { registroValidator, loginValidator } from "../validators/auth.validator.js";
import { handleValidation } from "../middlewares/handleValidation.js";

const router = Router();

router.post("/register", registroValidator, handleValidation, register);
router.post("/login", loginValidator, handleValidation, login);

export default router;
