import config from '../../config';
import { TBlog } from './blog.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
const createBlogIntoDb = async (blogContent: TBlog, token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_secrect_token as string,
  ) as JwtPayload;
  console.log(decoded);
};

export const blogServices = {
  createBlogIntoDb,
};
