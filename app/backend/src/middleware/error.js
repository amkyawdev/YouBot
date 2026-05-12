// Error Handling Middleware
export function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: {
      message,
      status,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
}

export function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: {
      message: 'Not Found',
      status: 404
    }
  });
}