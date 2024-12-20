import config from '../../config';
import { TBlog } from './blog.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Blog } from './blog.model';
const createBlogIntoDb = async (blogContent: TBlog, token: string) => {
  if (!token) {
    throw new Error('Your are not authorized');
  }
  const decoded = jwt.verify(
    token,
    config.jwt_secrect_token as string,
  ) as JwtPayload;
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
    throw new Error('Your are not authorized');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_secrect_token as string,
  ) as JwtPayload;
  const { userID, role, email } = decoded;

  if (!decoded) {
    throw new Error('Your are not authorized');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');

  return result;
};

const deleteAblogFromDb = async (id: string) => {
  const result = await Blog.deleteOne({ _id: id });

  return result;
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

  const sortOptions = sortBy
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
