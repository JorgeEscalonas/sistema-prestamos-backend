// src/middlewares/error.handler.js
export default function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    status: "error",
    message: err.message || "Error del servidor",
  });
}
