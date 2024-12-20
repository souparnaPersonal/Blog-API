import express from 'express';
import { adminControllers } from './admin.controllers';

const router = express.Router();

router.patch('/admin/users/:userId/block', adminControllers.blockUser);
router.delete('/admin/blogs/:id', adminControllers.deleteBlog);

export const AdminRoutes = router;
