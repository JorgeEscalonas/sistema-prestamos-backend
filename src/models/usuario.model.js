import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    cedula: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: {
      type: DataTypes.ENUM("admin", "operador"),
      defaultValue: "admin",
    },
  },
  { tableName: "usuarios", timestamps: true }
);

export default Usuario;
