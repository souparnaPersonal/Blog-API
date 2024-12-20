import express, { Application } from 'express';

import cors from 'cors';
import { AuthRoutes } from './app/modules/Auth/auth.routes';
import { BlogRoutes } from './app/modules/Blog/blog.routes';
import { AdminRoutes } from './app/modules/Admin/admin.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api', AuthRoutes);
app.use('/api', BlogRoutes);
app.use('/api', AdminRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to blog-web-api',
  });
});

export default app;
