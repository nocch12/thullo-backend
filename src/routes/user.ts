import express, { Request, Response } from 'express';
const router = express.Router();
import { UserController } from '../controllers/UserController';
import { IUserRegisterRequest } from '../requests/user/UserRegisterRequest';
import passport from '../middleware/passport';

const userController = new UserController();

router.get('/me', async (req: Request, res: Response) => {
  // const result = await userController.me(req);
  // res.json(result);
});

router.post('/register', async (req: IUserRegisterRequest, res, next) => {
  try {
    const result = await userController.register(req);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  async (req: Request, res: Response) => {
    const result = await userController.login(req);
    res.json(result);
  }
);

export default router;
