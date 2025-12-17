import bcrypt from "bcrypt";
import { Usuario } from "../models/index.js";

const SALT_ROUNDS = 10;

// GET /api/usuarios
export const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ["password"] }, // No devolver contraseñas
        });
        res.json(usuarios);
    } catch (err) {
        next(err);
    }
};

// GET /api/usuarios/:id
export const getUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ["password"] },
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(usuario);
    } catch (err) {
        next(err);
    }
};

// POST /api/usuarios (Crear usuario - similar a register)
export const createUsuario = async (req, res, next) => {
    try {
        const { nombre, cedula, password, rol = "operador" } = req.body;

        if (!nombre || !cedula || !password) {
            return res.status(400).json({ message: "Nombre, cédula y contraseña son obligatorios." });
        }

        const existing = await Usuario.findOne({ where: { cedula } });
        if (existing) {
            return res.status(409).json({ message: "La cédula ya está registrada." });
        }

        const hashed = await bcrypt.hash(password, SALT_ROUNDS);

        const usuario = await Usuario.create({
            nombre,
            cedula,
            password: hashed,
            rol,
        });

        return res.status(201).json({
            message: "Usuario creado correctamente.",
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                cedula: usuario.cedula,
                rol: usuario.rol,
            },
        });
    } catch (err) {
        next(err);
    }
};

// PUT /api/usuarios/:id
export const updateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, cedula, password, rol } = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Si se actualiza la cédula, verificar que no exista ya otra igual
        if (cedula && cedula !== usuario.cedula) {
            const existing = await Usuario.findOne({ where: { cedula } });
            if (existing) {
                return res.status(409).json({ message: "La cédula ya está registrada por otro usuario." });
            }
            usuario.cedula = cedula;
        }

        if (nombre) usuario.nombre = nombre;
        if (rol) {
            if (!['admin', 'operador'].includes(rol)) {
                return res.status(400).json({ message: "Rol inválido. Debe ser 'admin' u 'operador'." });
            }
            usuario.rol = rol;
        }

        // Si envían password, hashearlo
        if (password) {
            usuario.password = await bcrypt.hash(password, SALT_ROUNDS);
        }

        await usuario.save();

        res.json({
            message: "Usuario actualizado correctamente",
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                cedula: usuario.cedula,
                rol: usuario.rol,
            },
        });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/usuarios/:id
export const deleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Opcional: Evitar que un admin se borre a sí mismo si fuera necesario, 
        // pero por ahora lo dejamos simple.

        await usuario.destroy();

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
        next(err);
    }
};
