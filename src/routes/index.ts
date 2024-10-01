import { Express } from 'express';
import projectRouter from './ProjectRouter';
import TaskRouter from './TaskRouter';

const apiRouter = (app: Express): void => {
     app.use('/api/projects', projectRouter);
     app.use('/api/tasks', TaskRouter);
};

export default apiRouter;
