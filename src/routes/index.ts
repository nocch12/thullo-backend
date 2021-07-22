import express, { Request, Response } from 'express';
const router = express.Router();
import { IndexController } from '../controllers/IndexController';

const indexController = new IndexController();

/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
  const result = await indexController.index(req);
  res.send(result);
});

export default router;
