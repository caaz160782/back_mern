import { Express } from 'express';
import projectRouter from './ProjectRouter';
import TaskRouter from './TaskRouter';
import authRouter from './authRouter';

const apiRouter = (app: Express): void => {
     app.use('/api/auth', authRouter);
     app.use('/api/projects', projectRouter);
     app.use('/api/projects', TaskRouter);
};

export default apiRouter;
