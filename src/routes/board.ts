import express from 'express';
const router = express.Router();
import passport from '../middleware/passport';
import { BoardController } from '../controllers/BoardController';

const boardController = new BoardController();

router.get('/', boardController.index);
router.post(
  '/',
  passport.authenticate('verify', { session: false }),
  boardController.create
);
router.post(
  '/update/published',
  passport.authenticate('verify', { session: false }),
  boardController.updatePublished
);

export default router;
