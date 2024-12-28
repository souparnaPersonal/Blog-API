import mongoose from 'mongoose';
import { Terror, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const error: Terror = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    error,
    message: 'Invalid id',
  };
};

export default handleCastError;
