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

export const blogController = {
  createBlog,
};
