import express, { Request, Response } from 'express';
const router = express.Router();
import { UserController } from '../controllers/UserController';
import { IUserRegisterRequest } from '../requests/user/UserRegisterRequest';
import passport from '../middleware/passport';

const userController = new UserController();

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
  async (req, res, next) => {
    try {
      const result = await userController.login(req);
      // クッキーにキー'jwt'でトークンをセット
      res.cookie('jwt', result.headerToken, {
        httpOnly: true,
        signed: true,
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/me',
  passport.authenticate('verify', { session: false }),
  async (req, res, next) => {
    try {
      res.json({ user: req.user });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
