/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

import config from '../config';
import handdleZoderror from '../err/handdleZoderror';
import handleValidationError from '../err/handleValidationError';
import handleCastError from '../err/handleCastError';
import handleDublicateError from '../err/handleDublicateError';
import Apperror from '../err/AppError';
import { Terror } from '../interface/error';

const globalErrorHandler: any = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // settings default pattern
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  let error: Terror = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handdleZoderror(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDublicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err instanceof Apperror) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    error,
    err,
    stack: config.node_dev === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
