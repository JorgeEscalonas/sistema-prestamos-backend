// src/middlewares/auth.middleware.js
import { verifyAccessToken } from "../utils/token.util.js";

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No autorizado - token faltante" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);

        res.user = decoded
        return next()
    } catch (err) {
        return res.status(401).json({ message: "No autorizado - token inválido", error: err.message });
    }
}

// middleware para roles
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "No autorizado" });
    if (typeof roles === "string") roles = [roles];
    if (roles.length && !roles.includes(req.user.rol)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
};