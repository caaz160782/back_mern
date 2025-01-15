import { Express } from 'express';
import projectRouter from './ProjectRouter';
import TaskRouter from './TaskRouter';
import UserRouter from './UserRouter'
import authRouter from './authRouter';

const apiRouter = (app: Express): void => {
     app.use('/api/auth', authRouter);
     app.use('/api/projects', projectRouter);
     app.use('/api/projects', TaskRouter);
     app.use('/api/projects', UserRouter);
};

export default apiRouter;
