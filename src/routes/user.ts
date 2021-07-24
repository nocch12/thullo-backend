import express, { Request, Response } from 'express';
const router = express.Router();
import { UserController } from '../controllers/UserController';
import { UserRegisterRequest } from '../requests/user/UserRegisterRequest';

const userController = new UserController();

router.post('/register', async (req: UserRegisterRequest, res: Response) => {
  const result = await userController.register(req);
  res.json(result);
});

export default router;
