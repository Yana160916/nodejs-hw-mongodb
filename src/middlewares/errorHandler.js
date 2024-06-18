import createError from 'http-errors';

export const setupErrorHandler = (err, req, res) => {
  res.status(err.status || 500).json({
    status: res.statusCode,
    message: 'Something went wrong',
    data: err.message,
  });
};

export const setupNotFoundHandler = (req, res, next) => {
  next(createError(404, 'Route not found'));
};
