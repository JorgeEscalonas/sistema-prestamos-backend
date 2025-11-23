import PDFDocument from "pdfkit";

// Colors
const PRIMARY_COLOR = "#1a252f"; // Darker Blue/Grey (Midnight Blue)
const ACCENT_COLOR = "#3498db"; // Bright Blue
const TEXT_COLOR = "#2c3e50";
const LIGHT_GREY = "#bdc3c7";
const TABLE_HEADER_BG = "#f4f6f7";
const TABLE_STRIPE_BG = "#fcfcfc";
const WHITE = "#FFFFFF";

export const drawHeader = (doc, title) => {
    // Modern Header: Top colored bar with accent line
    const headerHeight = 60;

    // Main dark bar
    doc.rect(0, 0, doc.page.width, headerHeight).fill(PRIMARY_COLOR);

    // Accent line at the bottom of the header
    doc.rect(0, headerHeight, doc.page.width, 4).fill(ACCENT_COLOR);

    // Title
    doc.fillColor(WHITE)
        .fontSize(22)
        .font("Helvetica-Bold")
        .text(title, 50, 20, { align: "left" });

    // Date and Company Info on the right
    const date = new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    doc.fontSize(10)
        .font("Helvetica")
        .text("SISTEMA DE PRÉSTAMOS", 0, 15, { align: "right", width: doc.page.width - 50 });

    doc.fontSize(9)
        .fillColor(LIGHT_GREY)
        .text(date, 0, 30, { align: "right", width: doc.page.width - 50 });

    // Reset position
    doc.y = headerHeight + 30; // Start content below header
};

export const drawFooter = (doc) => {
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);

        // Save current bottom margin
        const oldBottomMargin = doc.page.margins.bottom;
        doc.page.margins.bottom = 0;

        const footerY = doc.page.height - 40;

        // Footer line
        doc.moveTo(50, footerY - 10)
            .lineTo(doc.page.width - 50, footerY - 10)
            .strokeColor(LIGHT_GREY)
            .lineWidth(0.5)
            .stroke();

        // Footer text
        doc.fillColor(LIGHT_GREY)
            .fontSize(8)
            .text(
                "CONFIDENCIAL | Generado por Sistema de Préstamos",
                50,
                footerY,
                { align: "left" }
            );

        doc.text(
            `Página ${i + 1} de ${pageCount}`,
            0,
            footerY,
            { align: "right", width: doc.page.width - 50 }
        );

        // Restore bottom margin
        doc.page.margins.bottom = oldBottomMargin;
    }
};

export const drawTable = (doc, headers, rows) => {
    const startX = 50;
    const tableWidth = doc.page.width - 100;
    const colWidth = tableWidth / headers.length;
    const rowHeight = 30;
    const headerHeight = 35;

    // Check if we need a new page for the header
    if (doc.y + headerHeight > doc.page.height - 60) {
        doc.addPage();
        drawHeader(doc, "Continuación...");
    }

    // Draw Table Header
    doc.rect(startX, doc.y, tableWidth, headerHeight).fill(TABLE_HEADER_BG);
    doc.fillColor(PRIMARY_COLOR).fontSize(10).font("Helvetica-Bold");

    let currentY = doc.y; // Capture Y after rect fill

    headers.forEach((header, i) => {
        doc.text(header, startX + (i * colWidth) + 10, currentY + 12, {
            width: colWidth - 20,
            align: "left",
        });
    });

    doc.y += headerHeight;

    // Draw Rows
    doc.font("Helvetica").fontSize(9);

    rows.forEach((row, rowIndex) => {
        // Check for page break
        if (doc.y + rowHeight > doc.page.height - 60) {
            doc.addPage();
            drawHeader(doc, "Continuación...");

            // Redraw table header on new page
            doc.rect(startX, doc.y, tableWidth, headerHeight).fill(TABLE_HEADER_BG);
            doc.fillColor(PRIMARY_COLOR).fontSize(10).font("Helvetica-Bold");

            let headerY = doc.y;
            headers.forEach((header, i) => {
                doc.text(header, startX + (i * colWidth) + 10, headerY + 12, {
                    width: colWidth - 20,
                    align: "left",
                });
            });
            doc.y += headerHeight;
            doc.font("Helvetica").fontSize(9);
        }

        const rowY = doc.y;

        // Zebra striping
        if (rowIndex % 2 === 0) {
            doc.rect(startX, rowY, tableWidth, rowHeight).fill(TABLE_STRIPE_BG);
        }

        // Bottom border for row
        doc.moveTo(startX, rowY + rowHeight)
            .lineTo(startX + tableWidth, rowY + rowHeight)
            .strokeColor("#eeeeee")
            .lineWidth(0.5)
            .stroke();

        doc.fillColor(TEXT_COLOR);

        row.forEach((cell, i) => {
            doc.text(cell.toString(), startX + (i * colWidth) + 10, rowY + 10, {
                width: colWidth - 20,
                align: "left",
                height: rowHeight
            });
        });

        doc.y = rowY + rowHeight;
    });
};

export const drawSummaryCards = (doc, items) => {
    const startX = 50;
    const pageWidth = doc.page.width - 100;
    const cardGap = 20;
    const cardsPerRow = 2; // 2 cards per row for better visibility
    const cardWidth = (pageWidth - (cardGap * (cardsPerRow - 1))) / cardsPerRow;
    const cardHeight = 80;

    let currentX = startX;
    let currentY = doc.y;

    items.forEach((item, index) => {
        // Check if we need a new row
        if (index > 0 && index % cardsPerRow === 0) {
            currentX = startX;
            currentY += cardHeight + cardGap;
        }

        // Check page break
        if (currentY + cardHeight > doc.page.height - 60) {
            doc.addPage();
            drawHeader(doc, "Resumen (Continuación)");
            currentY = doc.y;
            currentX = startX;
        }

        // Draw Card Background (Rounded rect simulation)
        doc.roundedRect(currentX, currentY, cardWidth, cardHeight, 5)
            .fillAndStroke(TABLE_STRIPE_BG, "#e0e0e0");

        // Accent strip on left
        doc.roundedRect(currentX, currentY, 5, cardHeight, 2)
            .fill(ACCENT_COLOR);

        // Label
        doc.fillColor("#7f8c8d")
            .fontSize(10)
            .font("Helvetica-Bold")
            .text(item.label.toUpperCase(), currentX + 20, currentY + 15);

        // Value
        doc.fillColor(PRIMARY_COLOR)
            .fontSize(24)
            .font("Helvetica-Bold")
            .text(item.value, currentX + 20, currentY + 35);

        currentX += cardWidth + cardGap;
    });

    // Update doc.y to be below the last row of cards
    doc.y = currentY + cardHeight + 30;
};
