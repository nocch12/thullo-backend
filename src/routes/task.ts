import express from 'express';
const router = express.Router();
import passport from '../middleware/passport';
import { TaskController } from '../controllers/TaskController';

const taskController = new TaskController();


router.post(
  '/',
  passport.authenticate('verify', { session: false }),
  taskController.create
);

export default router;
