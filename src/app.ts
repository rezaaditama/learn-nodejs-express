import express, { type Application } from 'express';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import router from '@/routes/index';
import { notFoundHandler } from './errors/notFound';
import { errorHandler } from './errors/errorHandler';

const app: Application = express();

export const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

// Middleware untuk membaca JSON
app.use(express.json());

// Middleware untuk membaca form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware untuk CORS
app.use(cors());

// Integrasi HTTP logger
app.use(
  pinoHttp({
    logger,
  })
);

// Test
app.use('/api', router);

// Error Route
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
