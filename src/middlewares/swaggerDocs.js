// // src/middlewares/swaggerDocs.js

import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    console.log('Swagger doc loaded successfully'); // добавляем лог
    return {
      serve: swaggerUI.serve,
      setup: swaggerUI.setup(swaggerDoc, { explorer: true }), // добавьте explorer, если хотите
    };
  } catch (error) {
    console.error('Error loading Swagger:', error.message);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
