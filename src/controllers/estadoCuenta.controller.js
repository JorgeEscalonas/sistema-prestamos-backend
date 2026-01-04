import { Prestamo, Cliente, Pago } from "../models/index.js";
import { Op } from "sequelize";


export const getPrestamosPendientes = async (req, res) => {
    try {
        const prestamos = await Prestamo.findAll({
            where: { estado: 'pendiente' },
            include: [{ model: Cliente }],
        })

        res.json(prestamos);
    } catch (error) {
        console.error("Error al obtener préstamos pendientes:", error);
        res.status(500).json({ message: "Error al obtener préstamos pendientes" });
    }
}


export const getPrestamosPagados = async (req, res) => {
    try {
        const prestamos = await Prestamo.findAll({
            where: { estado: 'pagado' },
            include: [{ model: Cliente }],
        })

        res.json(prestamos);
    } catch (error) {
        console.error("Error al obtener préstamos pagados:", error);
        res.status(500).json({ message: "Error al obtener préstamos pagados" });
    }
}


export const getTotalesGenerales = async (req, res) => {
    try {
        const totalPrestamos = await Prestamo.count();
        const totalPendientes = await Prestamo.count({
            where: { estado: "pendiente" },
        });
        const totalPagados = await Prestamo.count({
            where: { estado: "pagado" },
        })

        const montoPrestado = await Prestamo.sum("montoPrestado");
        const saldoPendiente = await Prestamo.sum("saldoPendiente");
        const totalRecaudado = await Pago.sum("monto");

        res.json({
            totalPrestamos,
            totalPendientes,
            totalPagados,
            montoPrestado: montoPrestado || 0,
            saldoPendiente: saldoPendiente || 0,
            totalRecaudado: totalRecaudado || 0,
        });
    } catch (error) {
        console.error("Error al obtener totales generales:", error);
        res.status(500).json({ message: "Error al obtener totales generales" });
    }
}

export const getMetricasMensuales = async (req, res) => {
    try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        // Rango Mes Actual
        const startCurrent = new Date(currentYear, currentMonth, 1);
        const endCurrent = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);

        // Rango Mes Anterior
        const startLast = new Date(currentYear, currentMonth - 1, 1);
        const endLast = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

        // --- CLIENTES ---
        const clientesMesActual = await Cliente.count({
            where: {
                createdAt: { [Op.between]: [startCurrent, endCurrent] }
            }
        });
        const clientesMesAnterior = await Cliente.count({
            where: {
                createdAt: { [Op.between]: [startLast, endLast] }
            }
        });

        // Calculo porcentaje Clientes
        let clientesPorcentaje = 0;
        if (clientesMesAnterior === 0) {
            clientesPorcentaje = clientesMesActual > 0 ? 100 : 0;
        } else {
            clientesPorcentaje = ((clientesMesActual - clientesMesAnterior) / clientesMesAnterior) * 100;
        }

        // --- PRÉSTAMOS ---
        const prestamosMesActual = await Prestamo.count({
            where: {
                createdAt: { [Op.between]: [startCurrent, endCurrent] }
            }
        });
        const prestamosMesAnterior = await Prestamo.count({
            where: {
                createdAt: { [Op.between]: [startLast, endLast] }
            }
        });

        // Calculo porcentaje Préstamos
        let prestamosPorcentaje = 0;
        if (prestamosMesAnterior === 0) {
            prestamosPorcentaje = prestamosMesActual > 0 ? 100 : 0;
        } else {
            prestamosPorcentaje = ((prestamosMesActual - prestamosMesAnterior) / prestamosMesAnterior) * 100;
        }

        res.json({
            clientes: {
                cantidad: clientesMesActual,
                porcentaje: parseFloat(clientesPorcentaje.toFixed(2)),
                mesAnterior: clientesMesAnterior
            },
            prestamos: {
                cantidad: prestamosMesActual,
                porcentaje: parseFloat(prestamosPorcentaje.toFixed(2)),
                mesAnterior: prestamosMesAnterior
            }
        });

    } catch (error) {
        console.error("Error obteniendo métricas mensuales:", error);
        res.status(500).json({ message: "Error calculando métricas mensuales" });
    }
};

// 📊 GRÁFICA DE BARRAS: Rentabilidad Anual (12 meses)
// Compara Inversión (Capital prestado) vs Ganancia (Interés generado) mes a mes
export const getGraficaRentabilidadAnual = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        // Obtener todos los préstamos del año
        const prestamos = await Prestamo.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(`${currentYear}-01-01`), new Date(`${currentYear}-12-31`)]
                }
            }
        });

        // Nombres de meses para el frontend
        const mesesNombres = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

        // Estructura base para los 12 meses
        const datosAnuales = Array.from({ length: 12 }, (_, i) => ({
            mes: mesesNombres[i],
            inversion: 0,
            ganancia: 0
        }));

        prestamos.forEach(p => {
            const mesIndex = p.createdAt.getMonth(); // 0-11
            const inversion = parseFloat(p.montoPrestado);
            // Ganancia es el interés (Total - Capital)
            const ganancia = parseFloat(p.montoTotal) - inversion;

            datosAnuales[mesIndex].inversion += inversion;
            datosAnuales[mesIndex].ganancia += ganancia;
        });

        res.json(datosAnuales);
    } catch (error) {
        console.error("Error generando gráfica anual:", error);
        res.status(500).json({ message: "Error generando gráfica anual" });
    }
};

// 📈 GRÁFICA LINEAL: Flujo de Caja (Liquidez)
// Maneja agrupación Mensual, Trimestral y Anual
export const getGraficaFlujoCaja = async (req, res) => {
    try {
        const { periodo } = req.query; // 'mensual', 'trimestral', 'anual'

        const pagos = await Pago.findAll({
            order: [['createdAt', 'ASC']]
        });
        const prestamos = await Prestamo.findAll({
            order: [['createdAt', 'ASC']]
        });

        // Función auxiliar para agrupar data
        const agruparPorFecha = (items, tipoDato) => {
            const grupos = {};

            items.forEach(item => {
                const fecha = new Date(item.createdAt);
                const year = fecha.getFullYear();
                let key = "";

                if (periodo === 'anual') {
                    key = `${year}`;
                } else if (periodo === 'trimestral') {
                    const q = Math.floor(fecha.getMonth() / 3) + 1;
                    key = `${year}-Q${q}`;
                } else {
                    // Default: Mensual (YYYY-MM)
                    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                    key = `${year}-${mes}`;
                }

                if (!grupos[key]) grupos[key] = 0;

                // Si es un préstamo, sumamos montoPrestado (egreso)
                // Si es un pago, sumamos monto (ingreso)
                const valor = tipoDato === 'prestamo' ? parseFloat(item.montoPrestado) : parseFloat(item.monto);
                grupos[key] += valor;
            });
            return grupos;
        };

        const ingresos = agruparPorFecha(pagos, 'pago');
        const egresos = agruparPorFecha(prestamos, 'prestamo');

        // Unificar todas las llaves de tiempo encontradas
        const allKeys = [...new Set([...Object.keys(ingresos), ...Object.keys(egresos)])].sort();

        // Construir dataset final
        const dataset = allKeys.map(key => ({
            periodo: key,
            ingresos: ingresos[key] || 0,
            egresos: egresos[key] || 0
        }));

        res.json(dataset);

    } catch (error) {
        console.error("Error generando gráfica flujo caja:", error);
        res.status(500).json({ message: "Error generando gráfica flujo caja" });
    }
};
