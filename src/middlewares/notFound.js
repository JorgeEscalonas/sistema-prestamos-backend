export const notFound = (req, res, next) => {
  res.status(404).json({
    error: true,
    mensaje: `La ruta ${req.originalUrl} no existe en este servidor.`,
  });
};
