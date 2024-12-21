import { adminServices } from './admin.services';
import { NextFunction, Request, Response } from 'express';
const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const result = await adminServices.blockUserFromdb(
      req.params.userId,
      token as string,
    );

    res.status(200).json({
      message: 'User blocked successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminServices.deleteBlogFromDb(
      req.params.id,
      req.headers.authorization as string,
    );

    res.status(200).json({
      message: 'Blog deleted successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const adminControllers = {
  blockUser,
  deleteBlog,
};
