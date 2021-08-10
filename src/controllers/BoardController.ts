import { Request, Response, NextFunction } from 'express';
import { BoardFindUseCase } from '../usecases/board/BoardFindUseCase';
import { BoardCreateUseCase } from '../usecases/board/BoardCreateUseCase';
import { BoardCreateRequest } from '../requests/board/BoardCreateRequest';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { BoardUpdatePublishedRequest } from '../requests/board/BoardUpdatePublishedRequest';
import { BoardUpdateUseCase } from '../usecases/board/BoardUpdateUseCase';

export class BoardController {
  // ボード一覧
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await new BoardFindUseCase().findAllwithUsers();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  // ボード作成
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createRequest = new BoardCreateRequest(req.body);

      if (!req.user) {
        throw new UnauthorizedException();
      }

      const result = await new BoardCreateUseCase().create(
        createRequest,
        req.user
      );

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  // 公開非公開更新
  async updatePublished(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new BoardUpdatePublishedRequest(req.body);

      if (!req.user) {
        throw new UnauthorizedException();
      }

      const result = await new BoardUpdateUseCase().updatePubleshed(
        request,
        req.user
      );

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
