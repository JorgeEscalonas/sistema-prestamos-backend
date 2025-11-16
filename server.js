// server.js
import dotenv from "dotenv";
dotenv.config();


// Importar modelos y relaciones antes de conectar la base de datos
import "./src/models/index.js";
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

const PORT = process.env.PORT || 4000;

// Conectarse a MySQL y luego iniciar el servidor
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  });
};

startServer();
