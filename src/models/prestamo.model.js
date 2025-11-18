import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Prestamo = sequelize.define(
  "Prestamo",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    montoPrestado: { type: DataTypes.FLOAT, allowNull: false },
    porcentaje: { type: DataTypes.FLOAT, allowNull: false },
    montoTotal: { type: DataTypes.FLOAT, allowNull: false }, // monto + intereses
    saldoPendiente: { type: DataTypes.FLOAT, allowNull: false },
    tasaUsada: { type: DataTypes.FLOAT, allowNull: false },
    estado: {
      type: DataTypes.ENUM("pendiente", "pagado"),
      defaultValue: "pendiente",
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { tableName: "prestamos", timestamps: true }
)

export default Prestamo;
