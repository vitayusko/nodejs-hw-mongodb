export const errorHandler = (err, req, res, next) => {
  const message = err.message
    ? err.message
    : 'No specific error message provided';

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: message,
  });
};
