import express, { Application } from 'express';

import cors from 'cors';
import { AuthRoutes } from './modules/Auth/auth.routes';
import { BlogRoutes } from './modules/Blog/blog.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api', AuthRoutes);
app.use('/api', BlogRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: ' to  Api',
  });
});

export default app;
