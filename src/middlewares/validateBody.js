//src/middlewares/validateBody.js

import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const details = err.details.map((detail) => ({
      message: detail.message,
      path: detail.path,
    }));

    const error = createHttpError(400, 'Validation error', { details });
    next(error);
  }
};
