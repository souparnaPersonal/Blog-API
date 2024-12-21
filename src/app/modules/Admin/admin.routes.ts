import express from 'express';
import { adminControllers } from './admin.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.patch(
  '/admin/users/:userId/block',
  auth(USER_ROLE.admin),
  adminControllers.blockUser,
);
router.delete(
  '/admin/blogs/:id',
  auth(USER_ROLE.admin),
  adminControllers.deleteBlog,
);

export const AdminRoutes = router;
