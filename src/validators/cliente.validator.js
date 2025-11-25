import { body } from "express-validator";

export const clienteValidator = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio."),
  body("cedula")
    .notEmpty().withMessage("La cédula es obligatoria.")
    .isNumeric().withMessage("La cédula debe ser numérica."),
  body("telefono")
    .notEmpty().withMessage("El teléfono es obligatorio.")
    .isNumeric().withMessage("El teléfono debe contener solo números."),
];
