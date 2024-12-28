import { adminServices } from './admin.services';
import { NextFunction, Request, Response } from 'express';
const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await adminServices.blockUserFromdb(req.params.userId);

    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await adminServices.deleteBlogFromDb(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const adminControllers = {
  blockUser,
  deleteBlog,
};
