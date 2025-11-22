// src/controllers/tasa.controller.js
import Tasa from "../models/tasa.model.js";

// Crear una nueva tasa
export const crearTasa = async (req, res, next) => {
  try {
    const { valor } = req.body;

    if (!valor || isNaN(valor)) {
      return res.status(400).json({ message: "El valor de la tasa es obligatorio y debe ser numérico." });
    }

    const tasa = await Tasa.create({ valor });

    return res.status(201).json({
      message: "Tasa registrada correctamente.",
      tasa
    });
  } catch (err) {
    next(err);
  }
};

// Obtener todas las tasas o la más reciente
export const obtenerTasas = async (req, res, next) => {
  try {
    const { ultima } = req.query;

    if (ultima === "true") {
      const tasa = await Tasa.findOne({ order: [["fecha", "DESC"]] });
      return res.status(200).json(tasa);
    }

    const tasas = await Tasa.findAll({ order: [["fecha", "DESC"]] });
    return res.status(200).json(tasas);
  } catch (err) {
    next(err);
  }
};

// Editar una tasa existente
export const editarTasa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { valor } = req.body;

    const tasa = await Tasa.findByPk(id);

    if (!tasa) {
      return res.status(404).json({ message: "Tasa no encontrada." });
    }

    if (valor && isNaN(valor)) {
      return res.status(400).json({ message: "El valor debe ser numérico." });
    }

    await tasa.update({
      valor: valor ?? tasa.valor
    });

    return res.status(200).json({
      message: "Tasa actualizada correctamente.",
      tasa
    });
  } catch (err) {
    next(err);
  }
};
