import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/err';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    errorSources,
    message: 'Invalid id',
  };
};

export default handleCastError;
