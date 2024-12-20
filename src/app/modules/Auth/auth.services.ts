import config from '../../config';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLogin } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUserIntoDb = async (payload: Partial<TUser>) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error('user not found');
  }
  if (user.isBlocked) {
    throw new Error('you are blocked');
  }

  const passwordMatched = await bcrypt.compare(payload.password, user.password);

  if (!passwordMatched) {
    throw new Error('Password not matched');
  }
  const jwtPayload = {
    userID: user._id,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(
    { ...jwtPayload },
    config.jwt_secrect_token as string,
    {
      expiresIn: '1d',
    },
  );
  const refreshToken = jwt.sign(
    { ...jwtPayload },
    config.jwt_refresh_token as string,
    {
      expiresIn: '3d',
    },
  );

  return {
    accessToken,
    refreshToken,
  };
};
export const authServices = {
  createUserIntoDb,
  loginUser,
};
