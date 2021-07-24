import { Express } from 'express';
import Index from './index';
import User from './user';

const routes = (app: Express): void => {
  app.use('/', Index);
  app.use('/user', User);
}

export default routes;
