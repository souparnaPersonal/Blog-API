import express, { Application } from 'express';

import cors from 'cors';
import { UserRoutes } from './modules/User/user.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api', UserRoutes);
app.get('/', (req, res) => {
  res.status(200).json({
    message: ' to  Api',
  });
});

export default app;
