import express, { Request, Response } from 'express';
const router = express.Router();
import { IndexController } from '../controllers/IndexController';

const indexController = new IndexController();

/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
  const result = await indexController.index(req);
  res.json(123);
});

router.get('/csrf-token', (req: Request, res: Response) => {
  res.json({ csrfToken: req.csrfToken() });
});

router.post('/', async (req: Request, res: Response) => {
  // const result = await indexController.index(req);
  res.json({ post: 1 });
});

export default router;
