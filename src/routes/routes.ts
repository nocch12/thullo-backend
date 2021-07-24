import { Express } from 'express';
import Index from './index';

const routes = (app: Express): void => {
  app.use('/', Index);
}

export default routes;
