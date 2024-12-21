import { TBlog } from './blog.interface';

import { Blog } from './blog.model';

import { SortOrder } from 'mongoose';
import { verifyToken } from '../../constant/verifiedToken';
const createBlogIntoDb = async (blogContent: TBlog, token: string) => {
  if (!token) {
    throw new Error('Your are not authorized');
  }

  const decoded = verifyToken(token);

  const { userID, role, email } = decoded;

  blogContent.author = userID;
  const blog = await Blog.create(blogContent);

  const result = await Blog.findById(blog._id).populate('author');
  return {
    result,
  };
};

const updateBlog = async (
  payload: Partial<TBlog>,
  id: string,
  token: string,
) => {
  console.log(token);
  if (!token) {
    throw new Error('Your are not authorized');
  }

  const decoded = verifyToken(token);
  const { userID, role, email } = decoded;

  if (!decoded) {
    throw new Error('Your are not authorized');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');
  if (!result) {
    throw new Error('Blog not found');
  }
  return result;
};

const deleteAblogFromDb = async (id: string) => {
  const result = await Blog.deleteOne({ _id: id });

  if (!result.acknowledged && result.deletedCount === 1) {
    throw new Error('some thing went wrong');
  }

  return null;
};

const getAllBlogsFromDb = async (queryParams: any) => {
  const { search, sortBy, sortOrder, filter } = queryParams;

  console.log(queryParams);

  const searchQuery = search
    ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const filterQuery = filter ? { author: filter } : {};

  const sortOptions: Record<string, SortOrder> = sortBy
    ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 }
    : { createdAt: -1 };

  console.log('sortOptions', sortOptions);
  const result = await Blog.find({ ...searchQuery, ...filterQuery })
    .sort(sortOptions)
    .populate('author');

  return result;
};
export const blogServices = {
  createBlogIntoDb,
  updateBlog,
  deleteAblogFromDb,
  getAllBlogsFromDb,
};
