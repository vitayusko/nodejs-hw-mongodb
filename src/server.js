//server.js

import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from './utils/evn.js';
import { EVN_VARS, UPLOAD_DIR } from './constants/index.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const logger = pino();
const PORT = env(EVN_VARS.PORT, 3000);

export const startServer = () => {
  const app = express();

  app.use(cors());

  app.use(pinoHttp({ logger }));

  app.use(express.json());

  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(router);
  app.use('/uploads', express.static(UPLOAD_DIR));
  // app.use('/api-docs', swaggerDocs());
  const { serve, setup } = swaggerDocs(); // Деструктуризация serve и setup

  app.use(
    '/api-docs',
    (req, res, next) => {
      console.log('Request to /api-docs received');
      next();
    },
    serve,
    setup,
  );
  app.use(notFoundHandler);

  app.use(errorHandler);

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
