import express from 'express';
import { blogController } from './blog.controllers';

const router = express.Router();

router.post('/blogs', blogController.createBlog);
router.patch('/blogs/:id', blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);
router.get('/blogs', blogController.getBlogs);

export const BlogRoutes = router;
