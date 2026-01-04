// controllers/payment.controller.js
import { Pago, Prestamo } from "../models/index.js";

export const crearPago = async (req, res) => {
  try {
    const { prestamoId, monto } = req.body;

    if (!prestamoId || !monto) {
      return res.status(400).json({ error: "prestamoId y monto son obligatorios" });
    }

    // Verificar que el préstamo exista
    const prestamo = await Prestamo.findByPk(prestamoId);
    if (!prestamo) {
      return res.status(404).json({ error: "El préstamo no existe" });
    }

    // Validar que no se pague más de lo que se debe
    if (monto > prestamo.saldoPendiente) {
      return res.status(400).json({
        error: `El monto supera el saldo pendiente (${prestamo.saldoPendiente})`,
      });
    }

    // Crear pago
    const pago = await Pago.create({
      prestamoId,
      monto,
    });

    // Actualizar saldo del préstamo
    prestamo.saldoPendiente -= monto;

    // Si está saldado, cambiar estado
    if (prestamo.saldoPendiente <= 0) {
      prestamo.saldoPendiente = 0;
      prestamo.estado = "pagado";
    }

    await prestamo.save();

    return res.json({
      mensaje: "Pago registrado con éxito",
      pago,
      nuevoSaldo: prestamo.saldoPendiente,
      estadoPrestamo: prestamo.estado,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ error: "Error al registrar pago" });
  }
};

export const obtenerPagosPorPrestamo = async (req, res) => {
  try {
    const { prestamoId } = req.params;

    const pagos = await Pago.findAll({
      where: { prestamoId },
      order: [["fechaPago", "DESC"]],
    });

    return res.json(pagos);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ error: "Error al obtener pagos" });
  }
};

// Obtener todos los pagos
export const obtenerTodosPagos = async (req, res) => {
  try {
    const { limit } = req.query;

    const pagos = await Pago.findAll({
      order: [["fechaPago", "DESC"]],
      limit: limit ? parseInt(limit) : undefined,
    });

    return res.json(pagos);
  } catch (error) {
    console.error("Error fetching all payments:", error);
    return res.status(500).json({ error: "Error al obtener todos los pagos" });
  }
};

// Obtener pago por ID
export const obtenerPagoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await Pago.findByPk(id);

    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    return res.json(pago);
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    return res.status(500).json({ error: "Error al obtener el pago" });
  }
};

// Actualizar pago
export const actualizarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto } = req.body;

    if (!monto) {
      return res.status(400).json({ error: "El monto es obligatorio" });
    }

    const pago = await Pago.findByPk(id);
    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    // Obtener el préstamo asociado
    const prestamo = await Prestamo.findByPk(pago.prestamoId);
    if (!prestamo) {
      return res.status(404).json({ error: "Préstamo asociado no encontrado" });
    }

    // Calcular la diferencia entre el monto anterior y el nuevo
    const diferenciaMonto = monto - pago.monto;

    // Validar que el nuevo monto no cause un saldo negativo
    if (prestamo.saldoPendiente - diferenciaMonto < 0) {
      return res.status(400).json({
        error: `El nuevo monto causaría un saldo negativo. Saldo actual: ${prestamo.saldoPendiente}`,
      });
    }

    // Actualizar el pago
    await pago.update({ monto });

    // Actualizar el saldo del préstamo
    prestamo.saldoPendiente -= diferenciaMonto;

    // Actualizar estado del préstamo
    if (prestamo.saldoPendiente <= 0) {
      prestamo.saldoPendiente = 0;
      prestamo.estado = "pagado";
    } else if (prestamo.estado === "pagado") {
      prestamo.estado = "activo";
    }

    await prestamo.save();

    return res.json({
      mensaje: "Pago actualizado con éxito",
      pago,
      nuevoSaldo: prestamo.saldoPendiente,
      estadoPrestamo: prestamo.estado,
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    return res.status(500).json({ error: "Error al actualizar el pago" });
  }
};

// Eliminar pago
export const eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await Pago.findByPk(id);
    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    // Obtener el préstamo asociado
    const prestamo = await Prestamo.findByPk(pago.prestamoId);
    if (!prestamo) {
      return res.status(404).json({ error: "Préstamo asociado no encontrado" });
    }

    // Revertir el pago del saldo del préstamo
    prestamo.saldoPendiente += pago.monto;

    // Actualizar estado del préstamo si es necesario
    if (prestamo.estado === "pagado" && prestamo.saldoPendiente > 0) {
      prestamo.estado = "activo";
    }

    await prestamo.save();

    // Eliminar el pago
    await pago.destroy();

    return res.json({
      mensaje: "Pago eliminado con éxito",
      nuevoSaldo: prestamo.saldoPendiente,
      estadoPrestamo: prestamo.estado,
    });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return res.status(500).json({ error: "Error al eliminar el pago" });
  }
};