import { Request, Response } from 'express';
import { blogServices } from './blog.services';

const createBlog = async (req: Request, res: Response) => {
  try {
    const result = await blogServices.createBlogIntoDb(
      req.body,
      req.headers.authorization as string,
    );

    res.status(200).json({
      message: 'blog created successfully',
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error: errorMessage,
    });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    const result = await blogServices.updateBlog(
      req.body,
      req.params.id,
      token as string,
    );
    res.status(200).json({
      message: 'blog updated successfully',
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error: errorMessage,
    });
  }
};
const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await blogServices.deleteAblogFromDb(
      id as unknown as string,
    );
    res.status(200).json({
      message: 'blog deleted successfully',
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error: errorMessage,
    });
  }
};

const getBlogs = async (req: Request, res: Response) => {
  try {
    const result = await blogServices.getAllBlogsFromDb(req.query);
    res.status(200).json({
      message: 'Blogs fetched successfully',
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error: errorMessage,
    });
  }
};

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
};
