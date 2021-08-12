import express from 'express';
const router = express.Router();
import passport from '../middleware/passport';
import { BoardController } from '../controllers/BoardController';

const boardController = new BoardController();

router.get('/', boardController.index);
router.get('/:boardId(\\d+)', boardController.detail);
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

export default router;
