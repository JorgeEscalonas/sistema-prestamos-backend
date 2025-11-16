// src/controllers/auth.controller.js
import bcrypt from "bcrypt";
import { Usuario } from "../models/index.js";
import { generateAccessToken } from "../utils/token.util.js";

const SALT_ROUNDS = 10;

// POST /api/auth/register
export const register = async (req, res, next) => {
    try {
    const { nombre, cedula, password, rol = "operador" } = req.body;

        if (!nombre || !cedula || !password) {
            return res.status(400).json({ message: "Nombre, cédula y contraseña son obligatorios." });
        }

        const existing = await Usuario.findOne({ where: { cedula } });
        if (existing) {
            return res.status(409).json({ message: "La cédula ya está registrada." });
        }

        //hashear password
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);

        const usuario = await Usuario.create({
        nombre,
        cedula,
        password: hashed,
        rol,
        });

        // Respuesta mínima (no enviar password)
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
        next(err)
    }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const {cedula, password} = req.body;
    if(!cedula || !password){
        return res.status(400).json({message: "Cédula y contraseña son obligatorios."});
    }

    const usuario = await Usuario.findOne({where: {cedula}});
    if(!usuario){
        return  res.status(401).json({message: "Credenciales inválidas"});
    }

    const payload = {
        id: usuario.id,
        nombre: usuario.nombre,
        cedula: usuario.cedula,
        rol: usuario.rol
    };

    const accessToken = generateAccessToken(payload);

    // Opción: aquí podrías generar y devolver refresh token también (no incluido por simplicidad)
    return res.status(200).json({
      message: "Autenticación exitosa.",
      accessToken,
      user: payload,
    });

} catch (err) {
    next(err)
  }
}