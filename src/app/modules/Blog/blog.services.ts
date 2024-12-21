import { TBlog } from './blog.interface';

import { Blog } from './blog.model';

import { SortOrder } from 'mongoose';
import { verifyToken } from '../../constant/verifiedToken';
import { TUser } from '../User/user.interface';
import { JwtPayload } from 'jsonwebtoken';
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
  if (!token) {
    throw new Error('You are not authorized');
  }

  const decoded = verifyToken(token);
  const { userID, role, email } = decoded;

  if (!decoded) {
    throw new Error('You are not authorized');
  }

  // Fetch the blog to verify its author
  const blog = await Blog.findById(id);
  console.log(blog);
  if (!blog) {
    throw new Error('Blog not found');
  }

  // Check if the user is the author of the blog
  if (blog.author.toString() !== userID) {
    throw new Error('You are not allowed to update which is not your');
  }

  // Proceed with the update
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');

  if (!result) {
    throw new Error('Blog not found');
  }

  return result;
};

const deleteAblogFromDb = async (id: string, user: JwtPayload) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new Error('Blog not found');
  }

  // Check if the logged-in user is the author of the blog
  if (blog.author.toString() !== user.userID) {
    throw new Error('This is not your blog');
  }

  // Proceed with deleting the blog if the user is the author
  const result = await Blog.deleteOne({ _id: id });

  // If the deletion was not acknowledged, throw an error
  if (!result.acknowledged || result.deletedCount !== 1) {
    throw new Error('Something went wrong while deleting the blog');
  }

  return null; // Return null to ind
};

const getAllBlogsFromDb = async (queryParams: any) => {
  const { search, sortBy, sortOrder, filter } = queryParams;

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

  const result = await Blog.find({ ...searchQuery, ...filterQuery })
    .sort(sortOptions)
    .populate('author');
  // if (result.length) {
  //   throw new Error('no data found');
  // }
  return result;
};
export const blogServices = {
  createBlogIntoDb,
  updateBlog,
  deleteAblogFromDb,
  getAllBlogsFromDb,
};
