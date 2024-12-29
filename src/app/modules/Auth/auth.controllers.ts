/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { authServices } from './auth.services';
import httpStatus from 'http-status';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.createUserIntoDb(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.loginUser(req.body);
    const { token } = result;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: {
        token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const authController = {
  createUser,
  loginUser,
};
