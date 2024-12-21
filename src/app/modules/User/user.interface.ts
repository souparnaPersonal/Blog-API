export type TUser = {
  name: string;
  role: 'admin' | 'user';
  updatedAt: Date;
  createdAt: Date;
  isBlocked: boolean;
  password: string;
  email: string;
};
