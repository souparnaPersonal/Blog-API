import { NextFunction, Request, Response } from 'express';
import { blogServices } from './blog.services';

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await blogServices.createBlogIntoDb(req.user, req.body);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    const result = await blogServices.updateBlog(
      req.body,
      req.params.id,
      token as string,
    );
    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const user = req.user;

    await blogServices.deleteAblogFromDb(id as unknown as string, user);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await blogServices.getAllBlogsFromDb(req.query);
    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
};
