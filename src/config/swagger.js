import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Sistema de Préstamos",
      version: "1.0.0",
      description: "Documentación del sistema de préstamos desarrollado en Node.js + Express + Sequelize",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingrese el token JWT obtenido al hacer login"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  // Archivos donde estarán las anotaciones
  apis: [
    "./src/routes/*.js",
    "./src/models/*.js",
    "./src/docs/*.js",
  ],
};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger listo en: http://localhost:4000/api-docs");
};
