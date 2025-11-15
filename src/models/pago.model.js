import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Pago = sequelize.define(
  "Pago",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    monto: { type: DataTypes.FLOAT, allowNull: false },

    fechaPago: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { tableName: "pagos", timestamps: true }
);

export default Pago;
