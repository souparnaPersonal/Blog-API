import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLogin } from './auth.interface';
import bcrypt from 'bcrypt';
const createUserIntoDb = async (payload: Partial<TUser>) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLogin) => {
  console.log(payload);
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error('user not found');
  }
  if (user.isBlocked) {
    throw new Error('your are blocked');
  }

  const passwordMatched = await bcrypt.compare(payload.password, user.password);

  console.log(passwordMatched);
};
export const authServices = {
  createUserIntoDb,
  loginUser,
};
