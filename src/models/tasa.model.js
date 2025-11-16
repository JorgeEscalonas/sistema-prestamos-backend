import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Tasa = sequelize.define(
  "Tasa",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: "tasas", timestamps: false }
);

export default Tasa;
