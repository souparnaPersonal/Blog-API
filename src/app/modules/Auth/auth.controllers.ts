import { NextFunction, Request, Response } from 'express';
import { authServices } from './auth.services';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.createUserIntoDb(req.body);

    res.status(200).json({
      message: 'Uaer created successfully',
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    next(error);
  }
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.loginUser(req.body);
    const { accessToken } = result;
    // res.cookie('refreshToken', refreshToken, {
    //   secure: false,
    //   httpOnly: true,
    // });
    res.status(200).json({
      message: 'Login successful',
      status: true,
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  createUser,
  loginUser,
};
