//src/middlewares/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || null;

  res.status(status).json({
    status: status,
    message: message,
    details: details,
  });
};
