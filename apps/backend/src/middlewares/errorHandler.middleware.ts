import { config } from '@/configs';
import httpStatus from '@/constants/http-status';
import { ErrorRequestHandler, RequestHandler } from 'express';

export const notFound: RequestHandler = (_req, res) => {
  res
    .status(httpStatus.NOT_FOUND)
    .json({
      status: httpStatus.NOT_FOUND,
      message: 'Requested URL is not found',
    });
};

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(
      config.NODE_ENV === 'development'
        ? err
        : new Error('There was a problem!'),
    );
    return;
  }

  if (err instanceof CustomError) {
    res.status(err.status).json({
      status: false,
      message: err.message,
    });
    return;
  }

  if (err.name === 'ValidationError') {
    res
      .status(httpStatus.VALIDATION_ERROR)
      .json({ status: false, message: err.message });
    return;
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: false,
    message:
      config.NODE_ENV === 'development'
        ? err.message
        : 'Internal server error!',
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export default errorHandler;
