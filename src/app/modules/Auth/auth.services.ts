import config from '../../config';
import { createToken } from '../../constant/createToken';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLogin } from './auth.interface';
import bcrypt from 'bcrypt';

const createUserIntoDb = async (payload: Partial<TUser>) => {
  const result = await User.create(payload);
  const dataTosend = {
    email: result.email,
    name: result.name,
    _id: result._id,
  };

  return dataTosend;
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
  const token = createToken(jwtPayload, config.jwt_secrect_token as string);

  return {
    token,
  };
};
export const authServices = {
  createUserIntoDb,
  loginUser,
};
