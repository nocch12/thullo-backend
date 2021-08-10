import { Request, Response } from 'express';

import {
  IUserRegisterRequest,
  UserRegisterRequest,
} from '../requests/user/UserRegisterRequest';
import { UserRegisterUseCase } from '../usecases/user/UserRegisterUseCase';
import { UserLoginUseCase } from '../usecases/user/UserLoginUseCase';
import { NotFoundException } from '../exceptions/NotFoundException';

export class UserController {
  async register(req: IUserRegisterRequest, res: Response) {
    try {
      const request = new UserRegisterRequest(req.body);
      const { name, email, password } = request;

      const useCase = new UserRegisterUseCase();
      const user = await useCase.register(name, email, password);

      return res.json({ user });
    } catch (e) {
      throw e;
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = req.user;
      const useCase = new UserLoginUseCase();

      if (!user) {
        throw new NotFoundException();
      }
      
      const token = useCase.createToken(user);

      // クッキーにキー'jwt'でトークンをセット
      res.cookie('jwt', token, {
        httpOnly: true,
        signed: true,
      });

      return res.json({ user });
    } catch (e) {
      throw e;
    }
  }

  async me(req: unknown) {
    return { me: 1 };
  }
}
