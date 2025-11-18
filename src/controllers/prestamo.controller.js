// src/controllers/prestamo.controller.js
import Prestamo from "../models/prestamo.model.js";
import Cliente from "../models/cliente.model.js";
import Tasa from "../models/tasa.model.js";

// Crear préstamo
export const crearPrestamo = async (req, res, next) => {
  try {
    const { clienteId, montoPrestado, porcentaje } = req.body;

    if (!clienteId || !montoPrestado || !porcentaje) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    // Conseguir la tasa más reciente
    const tasa = await Tasa.findOne({
      order: [["fecha", "DESC"]]
    });
    if (!tasa) {
      return res.status(400).json({ message: "No hay tasa registrada en el sistema." });
    }

    const tasaValor = tasa.valor;

    // Cálculo de intereses
    const montoTotal = montoPrestado + (montoPrestado * (porcentaje / 100));

    const prestamo = await Prestamo.create({
      clienteId,
      montoPrestado,
      porcentaje,
      montoTotal,
      saldoPendiente: montoTotal,
      estado: "pendiente",
      tasaUsada: tasaValor // debes agregar este campo a tu modelo
    });

    return res.status(201).json({
      message: "Préstamo creado correctamente.",
      prestamo
    });
  } catch (err) {
    next(err);
  }
};


// Obtener préstamos (opcional: por cliente)
export const obtenerPrestamos = async (req, res, next) => {
  try {
    const { clienteId } = req.query;

    let prestamos;

    if (clienteId) {
      prestamos = await Prestamo.findAll({
        where: { clienteId },
        order: [["createdAt", "DESC"]],
      });
    } else {
      prestamos = await Prestamo.findAll({
        order: [["createdAt", "DESC"]],
      });
    }

    return res.status(200).json(prestamos);
  } catch (err) {
    next(err);
  }
};


// Editar préstamo (por si quieres cambiar porcentaje o monto)
export const editarPrestamo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { montoPrestado, porcentaje } = req.body;

    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) {
      return res.status(404).json({ message: "Préstamo no encontrado." });
    }

    // recalcular si cambia algo
    let montoTotal = prestamo.montoTotal;

    if (montoPrestado || porcentaje) {
      const nuevoMonto = montoPrestado ?? prestamo.montoPrestado;
      const nuevoPorcentaje = porcentaje ?? prestamo.porcentaje;

      montoTotal = nuevoMonto + nuevoMonto * (nuevoPorcentaje / 100);
    }

    await prestamo.update({
      montoPrestado: montoPrestado ?? prestamo.montoPrestado,
      porcentaje: porcentaje ?? prestamo.porcentaje,
      montoTotal,
      saldoPendiente: montoTotal, // reiniciar saldo si editas
      estado: "pendiente",
    });

    return res.status(200).json({
      message: "Préstamo actualizado correctamente.",
      prestamo
    });
  } catch (err) {
    next(err);
  }
};


// Eliminar préstamo
export const eliminarPrestamo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) {
      return res.status(404).json({ message: "Préstamo no encontrado." });
    }

    await prestamo.destroy();

    return res.status(200).json({ message: "Préstamo eliminado correctamente." });
  } catch (err) {
    next(err);
  }
};
