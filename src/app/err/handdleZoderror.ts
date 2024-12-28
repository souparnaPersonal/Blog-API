import { ZodError, ZodIssue } from 'zod';
import { Terror, TGenericErrorResponse } from '../interface/error';

const handdleZoderror = (err: ZodError): TGenericErrorResponse => {
  const error: Terror = err.issues.map((issues: ZodIssue) => {
    return {
      path: issues.path[issues.path.length - 1],
      message: issues.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'zod vallidation error',
    error,
  };
};

export default handdleZoderror;
