import express from 'express';
const router = express.Router();
import passport from '../middleware/passport';
import { TaskListController } from '../controllers/TaskListController';

const taskListController = new TaskListController();

router.post(
  '/',
  passport.authenticate('verify', { session: false }),
  taskListController.create
);

router.post(
  '/delete',
  passport.authenticate('verify', { session: false }),
  taskListController.delete
);

export default router;
