import { body } from "express-validator";

export const pagoValidator = [
  body("prestamoId")
    .notEmpty().withMessage("El ID del préstamo es obligatorio.")
    .isNumeric().withMessage("El ID del préstamo debe ser numérico."),

  body("monto")
    .notEmpty().withMessage("El monto del pago es obligatorio.")
    .isFloat({ gt: 0 }).withMessage("El pago debe ser mayor a 0."),
];
