import express from 'express';
import { blogController } from './blog.controllers';
import validateRequest from '../../middleware/ValidateRequest';
import { blogValidation } from './blog.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/blogs',

  validateRequest(blogValidation.blogCreateValidation),
  blogController.createBlog,
);
router.patch(
  '/blogs/:id',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.updateValidation),
  blogController.updateBlog,
);
router.delete('/blogs/:id', auth(USER_ROLE.user), blogController.deleteBlog);
router.get('/blogs', blogController.getBlogs);

export const BlogRoutes = router;
