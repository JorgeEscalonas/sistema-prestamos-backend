import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error.handler.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', router);

// Global Error Handlers
app.use(notFound);
app.use(errorHandler);

export default app;