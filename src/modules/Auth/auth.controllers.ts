import { Request, Response } from 'express';
import { authServices } from './auth.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createUserIntoDb(req.body);

    res.status(200).json({
      message: 'Uaer created successfully',
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error: errorMessage,
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUser(req.body);

    res.status(200).json({
      message: 'Login successful',
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error: errorMessage,
    });
  }
};

export const authController = {
  createUser,
  loginUser,
};
