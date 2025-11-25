export const errorHandler = (err, req, res, next) => {

  console.error("🔥 ERROR DETECTADO:", err);

  // Error de Sequelize: violación de UNIQUE
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      error: true,
      mensaje: err.errors[0].message || "Entrada duplicada. El dato ya existe.",
    });
  }

  // Error de Sequelize: validaciones fallidas
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: true,
      mensaje: err.errors.map(e => e.message),
    });
  }

  // Error de Sequelize: clave foránea inválida
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      error: true,
      mensaje: "El recurso asociado no existe o no es válido.",
    });
  }

  // Error normal lanzado desde controladores
  if (err.message) {
    return res.status(err.statusCode || 500).json({
      error: true,
      mensaje: err.message,
    });
  }

  // Error desconocido (no deberías llegar aquí casi nunca)
  return res.status(500).json({
    error: true,
    mensaje: "Error interno del servidor.",
  });
};
