import { body } from "express-validator";

export const registroValidator = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio."),
  body("cedula")
    .notEmpty().withMessage("La cédula es obligatoria.")
    .isNumeric().withMessage("La cédula debe ser numérica."),
  body("password")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener mínimo 6 caracteres."),
];

export const loginValidator = [
  body("cedula").notEmpty().withMessage("La cédula es obligatoria."),
  body("password").notEmpty().withMessage("La contraseña es obligatoria."),
];
