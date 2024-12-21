import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/User/user.interface';
import Apperror from '../err/AppError';
import { verifyToken } from '../constant/verifiedToken';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new Apperror(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = verifyToken(token);

    console.log(decoded);

    const { role, userId, iat, email } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email: email });

    console.log(user);

    if (!user) {
      throw new Apperror(httpStatus.NOT_FOUND, 'This user is not found !!');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isBlocked;

    if (isDeleted) {
      throw new Apperror(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Apperror(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
