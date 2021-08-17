import express from 'express';
const router = express.Router();
import passport from '../middleware/passport';
import { BoardController } from '../controllers/BoardController';
import { TaskListController } from '../controllers/TaskListController';

const boardController = new BoardController();
const taskListController = new TaskListController();

router.get(
  '/',
  passport.authenticate('verify', { session: false }),

  boardController.index
);
router.post(
  '/',
  passport.authenticate('verify', { session: false }),
  boardController.create
);
router.patch(
  '/',
  passport.authenticate('verify', { session: false }),
  boardController.update
);
router.post(
  '/update/published',
  passport.authenticate('verify', { session: false }),
  boardController.updatePublished
);

router.post(
  '/user',
  passport.authenticate('verify', { session: false }),
  boardController.inviteUser
);
router.delete(
  '/user',
  passport.authenticate('verify', { session: false }),
  boardController.removeUser
);


/**
 * ボード詳細
 */
router.get(
  '/:boardId(\\d+)',
  passport.authenticate('verify', { session: false }),
  boardController.detail
);
router.get(
  '/:boardId(\\d+)/taskList',
  passport.authenticate('verify', { session: false }),
  taskListController.taskList
);

export default router;
