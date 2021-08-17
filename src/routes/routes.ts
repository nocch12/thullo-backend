import { Express } from 'express';
import Index from './index';
import User from './user';
import Board from './board';
import TaskList from './taskList';

const routes = (app: Express): void => {
  app.use('/', Index);
  app.use('/user', User);
  app.use('/board', Board);
  app.use('/taskList', TaskList);
};

export default routes;
