import express from 'express';
const router = express.Router();
import passport from '../middleware/passport';
import { BoardController } from '../controllers/BoardController';

const boardController = new BoardController();

router.get('/', boardController.index);

export default router;