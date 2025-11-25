import PDFDocument from "pdfkit";
import { sendPdfHeaders } from "../utils/pdfHeaders.js";
import Prestamo from "../models/prestamo.model.js";
import Cliente from "../models/cliente.model.js";
import { drawHeader, drawFooter, drawTable, drawSummaryCards } from "../utils/pdf.utils.js";

// -------------------------------------------------------------
// 🟦 PDF: Préstamos Pendientes
// -------------------------------------------------------------

export const generarPdfPendientes = async (req, res) => {
    try {
        const prestamos = await Prestamo.findAll({
            where: { estado: "pendiente" },
            include: [{ model: Cliente }],
        });

        const doc = new PDFDocument({ margin: 50, bufferPages: true, autoFirstPage: false });
        sendPdfHeaders(res, "prestamos_pendientes");
        doc.pipe(res);
        doc.addPage();

        drawHeader(doc, "Reporte de Préstamos Pendientes");

        const headers = ["Cliente", "Cédula", "Monto Prestado", "Saldo Pendiente", "Fecha"];
        const rows = prestamos.map(p => [
            p.Cliente ? p.Cliente.nombre : "Desconocido",
            p.Cliente ? p.Cliente.cedula : "N/A",
            `$${p.montoPrestado}`,
            `$${p.saldoPendiente}`,
            p.fechaRegistro.toISOString().split("T")[0]
        ]);

        drawTable(doc, headers, rows);
        drawFooter(doc);

        doc.end();
    } catch (error) {
        console.error("Error generando PDF pendientes:", error);
        res.status(500).json({ message: "Error generando PDF pendientes" });
    }
};


// -------------------------------------------------------------
// 🟩 PDF: Préstamos Pagados
// -------------------------------------------------------------

export const generarPdfPagados = async (req, res) => {
    try {
        const prestamos = await Prestamo.findAll({
            where: { estado: "pagado" },
            include: [{ model: Cliente }],
        });

        const doc = new PDFDocument({ margin: 50, bufferPages: true, autoFirstPage: false });
        sendPdfHeaders(res, "prestamos_pagados");
        doc.pipe(res);
        doc.addPage();

        drawHeader(doc, "Reporte de Préstamos Pagados");

        const headers = ["Cliente", "Monto Prestado", "Total Cancelado", "Fecha"];
        const rows = prestamos.map(p => [
            p.Cliente ? p.Cliente.nombre : "Desconocido",
            `$${p.montoPrestado}`,
            `$${p.montoTotal}`,
            p.fechaRegistro.toISOString().split("T")[0]
        ]);

        drawTable(doc, headers, rows);
        drawFooter(doc);

        doc.end();
    } catch (error) {
        console.error("Error generando PDF pagados:", error);
        res.status(500).json({ message: "Error generando PDF pagados" });
    }
};


// -------------------------------------------------------------
// 🟧 PDF: Resumen General
// -------------------------------------------------------------

export const generarPdfGeneral = async (req, res) => {
    try {
        const totalPrestamos = await Prestamo.count();
        const totalPendientes = await Prestamo.count({ where: { estado: "pendiente" } });
        const totalPagados = await Prestamo.count({ where: { estado: "pagado" } });

        const montoPrestado = await Prestamo.sum("montoPrestado") || 0;
        const saldoPendiente = await Prestamo.sum("saldoPendiente") || 0;

        const doc = new PDFDocument({ margin: 50, bufferPages: true, autoFirstPage: false });
        sendPdfHeaders(res, "reporte_general");
        doc.pipe(res);
        doc.addPage();

        drawHeader(doc, "Resumen General de Préstamos");

        const summaryItems = [
            { label: "Total de Préstamos", value: totalPrestamos.toString() },
            { label: "Préstamos Pendientes", value: totalPendientes.toString() },
            { label: "Préstamos Pagados", value: totalPagados.toString() },
            { label: "Monto Total Prestado", value: `$${montoPrestado}` },
            { label: "Saldo Total Pendiente", value: `$${saldoPendiente}` }
        ];

        drawSummaryCards(doc, summaryItems);

        // Add a small visual separator or note
        doc.fontSize(10).fillColor("#7f8c8d").text("Este reporte muestra el estado actual de la cartera de préstamos.", { align: "center" });

        drawFooter(doc);

        doc.end();
    } catch (error) {
        console.error("Error generando PDF general:", error);
        res.status(500).json({ message: "Error generando PDF general" });
    }
};
