import { Request } from 'express';

import {
  IUserRegisterRequest,
  UserRegisterRequest,
} from '../requests/user/UserRegisterRequest';
import { UserRegisterUseCase } from '../usecases/user/UserRegisterUseCase';
import { UserLoginUseCase } from '../usecases/user/UserLoginUseCase';
import { responseUser } from '../response/user/user';

export class UserController {
  async register(req: IUserRegisterRequest) {
    try {
      const request = new UserRegisterRequest(req.body);
      const { name, email, password } = request;

      const useCase = new UserRegisterUseCase();
      const user = await useCase.register(name, email, password);

      return { user };
    } catch (e) {
      throw e;
    }
  }

  async login(req: Request) {
    try {
      const user = req.user;
      const useCase = new UserLoginUseCase();
      const token = useCase.createToken(user as responseUser);

      return { headerToken: token, user };
    } catch (e) {
      throw e;
    }
  }

  async me(req: unknown) {
    return { me: 1 };
  }
}
