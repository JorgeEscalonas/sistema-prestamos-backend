import { Prestamo, Cliente } from "../models/index.js";


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

        res.json({
            totalPrestamos,
            totalPendientes,
            totalPagados,
            montoPrestado: montoPrestado || 0,
            saldoPendiente: saldoPendiente || 0,
        });
    } catch (error) {
        console.error("Error al obtener totales generales:", error);
        res.status(500).json({ message: "Error al obtener totales generales" });
    }
}
