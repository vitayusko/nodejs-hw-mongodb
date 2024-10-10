//src/middlewares/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message
    ? err.message
    : 'No specific error message provided';

  res.status(status).json({
    status: status,
    message: message,
    data: message,
  });
};
