import { User } from '../User/user.model';

const blockUserFromdb = async (userId: string) => {
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { isBlocked: true },
  );

  return result;
};

export const adminServices = {
  blockUserFromdb,
};
