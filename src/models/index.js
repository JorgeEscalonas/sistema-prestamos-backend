// src/models/index.js
import { sequelize } from "../config/database.js";
import Usuario from "./usuario.model.js";
import Cliente from "./cliente.model.js";
import Tasa from "./tasa.model.js";
import Prestamo from "./prestamo.model.js";
import Pago from "./pago.model.js";

// RELACIONES

// Un usuario administra muchos clientes
Usuario.hasMany(Cliente, { foreignKey: "usuarioId", onDelete: "SET NULL" });
Cliente.belongsTo(Usuario, { foreignKey: "usuarioId" });

// Un cliente tiene muchos préstamos
Cliente.hasMany(Prestamo, { foreignKey: "clienteId", onDelete: "CASCADE" });
Prestamo.belongsTo(Cliente, { foreignKey: "clienteId" });

// Una tasa puede usarse en muchos préstamos
Tasa.hasMany(Prestamo, { foreignKey: "tasaId", onDelete: "SET NULL" });
Prestamo.belongsTo(Tasa, { foreignKey: "tasaId" });

// Un préstamo tiene muchos pagos
Prestamo.hasMany(Pago, { foreignKey: "prestamoId", onDelete: "CASCADE" });
Pago.belongsTo(Prestamo, { foreignKey: "prestamoId" });

export { Usuario, Cliente, Tasa, Prestamo, Pago, sequelize };
