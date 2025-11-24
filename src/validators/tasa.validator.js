import { body } from "express-validator";

export const tasaValidator = [
  body("valor")
    .notEmpty().withMessage("El valor de la tasa es obligatorio.")
    .isFloat({ gt: 0 }).withMessage("La tasa debe ser mayor que 0."),
];
