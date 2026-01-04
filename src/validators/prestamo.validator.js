import { body } from "express-validator";

export const prestamoValidator = [
  body("clienteId")
    .notEmpty().withMessage("El ID del cliente es obligatorio.")
    .isNumeric().withMessage("El ID debe ser numérico."),
  body("montoPrestado")
    .notEmpty().withMessage("El monto prestado es obligatorio.")
    .isFloat({ gt: 0 }).withMessage("El monto debe ser mayor a 0."),
  body("porcentaje")
    .notEmpty().withMessage("El porcentaje es obligatorio.")
    .isFloat({ gt: 0 }).withMessage("El porcentaje debe ser mayor a 0."),
];
