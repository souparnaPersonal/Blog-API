import { verifyToken } from '../../constant/verifiedToken';
import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';

const blockUserFromdb = async (userId: string, token: string) => {
  if (!token) {
    throw new Error('Your are not authorized');
  }
  const user = verifyToken(token);
  console.log(user);

  if (user.role !== 'admin') {
    throw new Error('you are not admin !');
  }

  const isBlockedBeingUpdatedUser = await User.findById(userId);
  if (isBlockedBeingUpdatedUser?.isBlocked) {
    throw new Error('Allready blocked');
  }
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { isBlocked: true },
  );

  return result;
};

const deleteBlogFromDb = async (blogId: string, token: string) => {
  if (!token) {
    throw new Error('Your are not authorized');
  }
  const user = verifyToken(token);

  if (user.role !== 'admin') {
    throw new Error('you are not admin !');
  }
  const result = await Blog.deleteOne({ _id: blogId });
  return result;
};

export const adminServices = {
  blockUserFromdb,
  deleteBlogFromDb,
};
