import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/err';

const handdleZoderror = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issues: ZodIssue) => {
    return {
      path: issues.path[issues.path.length - 1],
      message: issues.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'zod vallidation error',
    errorSources,
  };
};

export default handdleZoderror;
