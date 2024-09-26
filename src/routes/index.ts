import { Express } from 'express';
import projectRouter from './ProjectRouter';

const apiRouter = (app: Express): void => {
     app.use('/api/projects', projectRouter);
};

export default apiRouter;
