import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';

const blockUserFromdb = async (userId: string, token: string) => {
  const isBlockedBeingUpdatedUser = await User.findById(userId);
  if (isBlockedBeingUpdatedUser?.isBlocked) {
    throw new Error('Allready blocked');
  }
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { isBlocked: true },
    {
      new: true,
    },
  );

  return result;
};

const deleteBlogFromDb = async (blogId: string, token: string) => {
  const result = await Blog.deleteOne({ _id: blogId });
  return result;
};

export const adminServices = {
  blockUserFromdb,
  deleteBlogFromDb,
};
