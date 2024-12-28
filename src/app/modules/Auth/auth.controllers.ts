/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { authServices } from './auth.services';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.createUserIntoDb(req.body);

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      statusCode: 400,
      error: { ...error },
      stack: 'error stack',
    });
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
    res.status(401).json({
      success: false,
      message: 'Invalid credentials',
      statusCode: 401,
      error: { ...error },
      stack: error?.stack,
    });
  }
};

export const authController = {
  createUser,
  loginUser,
};
