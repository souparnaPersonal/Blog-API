import { USER_ROLE } from './user.constant';
export type TUser = {
  name: string;
  role: 'admin' | 'user';
  updatedAt: Date;
  createdAt: Date;
  isBlocked: boolean;
  password: string;
  email: string;
};
export type TUserRole = keyof typeof USER_ROLE;
