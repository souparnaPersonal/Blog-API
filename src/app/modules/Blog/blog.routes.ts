import express from 'express';
import { blogController } from './blog.controllers';
import validateRequest from '../../middleware/ValidateRequest';
import { blogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/blogs',
  validateRequest(blogValidation.blogCreateValidation),
  blogController.createBlog,
);
router.patch(
  '/blogs/:id',
  validateRequest(blogValidation.updateValidation),
  blogController.updateBlog,
);
router.delete('/blogs/:id', blogController.deleteBlog);
router.get('/blogs', blogController.getBlogs);

export const BlogRoutes = router;
