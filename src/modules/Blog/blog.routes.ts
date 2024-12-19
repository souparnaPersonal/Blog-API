import express from 'express';
import { blogController } from './blog.controllers';

const router = express.Router();

router.post('/blogs', blogController.createBlog);

export const BlogRoutes = router;
