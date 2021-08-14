import express from 'express';
const router = express.Router();
import { UserController } from '../controllers/UserController';
import { IUserRegisterRequest } from '../requests/user/UserRegisterRequest';
import passport from '../middleware/passport';

const userController = new UserController();

// 新規登録
router.get('/', userController.search);

// 新規登録
router.post('/register', async (req: IUserRegisterRequest, res, next) => {
  try {
    return await userController.register(req, res);
  } catch (e) {
    next(e);
  }
});

// ログイン
router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  async (req, res, next) => {
    try {
      return await userController.login(req, res);
    } catch (e) {
      next(e);
    }
  }
);

// ログアウト
router.get(
  '/logout',
  (req, res, next) => {
    try {
      res.cookie('jwt', '');
      return res.json(null);
    } catch (e) {
      next(e);
    }
  }
);

// 認証ユーザー取得
router.get(
  '/me',
  passport.authenticate('verify', { session: false }),
  (req, res, next) => {
    try {
      res.json({ user: req.user });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
