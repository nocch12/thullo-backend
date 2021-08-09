import { Request, Response, NextFunction } from 'express';
import { BoardFindUseCase } from '../usecases/board/BoardFindUseCase';

export class BoardController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {      
      const result = await (new BoardFindUseCase).findAll();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // const request = new UserRegisterRequest(req.body);
      // const { name, email, password } = request;
      // const useCase = new UserRegisterUseCase();
      // const user = await useCase.register(name, email, password);
      // return res.json({ user });
    } catch (e) {
      next(e);
    }
  }
}
