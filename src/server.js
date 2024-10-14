//server.js

import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from './utils/evn.js';
import { EVN_VARS } from './constants/index.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

const logger = pino();
const PORT = env(EVN_VARS.PORT, 3000);

export const startServer = () => {
  const app = express();

  // Используем CORS для разрешения междоменных запросов
  app.use(cors());

  // Логирование запросов с использованием pino
  app.use(pinoHttp({ logger }));

  // Middleware для парсинга JSON-тел запросов
  app.use(express.json());

  // Middleware для работы с cookies
  app.use(cookieParser());

  // Тестовый маршрут для проверки работоспособности сервера
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  // Подключаем основной роутер
  app.use(router);

  // Обработка несуществующих маршрутов
  app.use(notFoundHandler);

  // Общая обработка ошибок
  app.use(errorHandler);

  // Обработка ошибок на всех остальных маршрутах
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  // Запуск сервера на указанном порту
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

// import express from 'express';
// import cors from 'cors';
// import pino from 'pino';
// import pinoHttp from 'pino-http';
// import { env } from './utils/evn.js';
// import { EVN_VARS } from './constants/index.js';
// import router from './routers/index.js';
// import { errorHandler } from './middlewares/errorHandler.js';
// import { notFoundHandler } from './middlewares/notFoundHandler.js';
// import cookieParser from 'cookie-parser';

// const logger = pino();
// const PORT = env(EVN_VARS.PORT, 3000);

// export const setupServer = () => {
//   const app = express();

//   app.use(cors());

//   app.use(pinoHttp({ logger }));

//   app.use(express.json());

//   app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello world!',
//     });
//   });

//   app.use(router);

//   app.use(notFoundHandler);

//   app.use(errorHandler);

//   app.use((err, req, res, next) => {
//     res.status(500).json({
//       message: 'Something went wrong',
//       error: err.message,
//     });
//   });

//   app.listen(PORT, () => {
//     logger.info(`Server is running on port ${PORT}`);
//   });
// };

// export const startServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.use(cors());
//   app.use(cookieParser());

//   /* Інший код файлу */
// };
