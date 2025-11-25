// src/controllers/cliente.controller.js
import { Cliente } from "../models/index.js";

//crear cliente 
export const crearCliente = async (req, res, next) => {
  try {
    const { nombre, cedula, telefono } = req.body;

    if (!nombre || !cedula || !telefono) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const existeCedula = await Cliente.findOne({ where: { cedula } });
    if (existeCedula) {
      return res.status(409).json({ message: "La cédula ya está registrada." });
    }

    const cliente = await Cliente.create({ nombre, cedula, telefono });

    return res.status(201).json({ message: "Cliente creado correctamente.", cliente });

  } catch (err) {
    next(err);
  }
}

// Obtener todos los clientes
export const obtenerClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(clientes);
  } catch (err) {
    next(err);
  }
}


// Editar cliente
export const editarCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, telefono } = req.body;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    // Validar cedula duplicada si está intentando cambiarla
    if (cedula && cedula !== cliente.cedula) {
      const cedulaUsada = await Cliente.findOne({ where: { cedula } });
      if (cedulaUsada) {
        return res.status(409).json({ message: "La cédula ya está registrada." });
      }
    }

    await cliente.update({
      nombre: nombre ?? cliente.nombre,
      cedula: cedula ?? cliente.cedula,
      telefono: telefono ?? cliente.telefono
    });

    return res.status(200).json({ message: "Cliente actualizado correctamente.", cliente });
  } catch (err) {
    next(err);
  }
}


// Eliminar cliente
export const eliminarCliente = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    await cliente.destroy();

    return res.status(200).json({ message: "Cliente eliminado correctamente." });
  } catch (err) {
    next(err);
  }
}