// src/config/database.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Instancia principal de Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, 
  }
);

// Función para conectar y sincronizar
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL establecida correctamente.");

    /*
    // Crea las tablas automáticamente
    await sequelize.sync({
      alter: true, // Modifica las tablas existentes para que coincidan con los modelos
    });
*/
    console.log("🗂️ Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error);
    process.exit(1);
  }
};
