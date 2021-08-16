import { Request, Response, NextFunction } from 'express';
import { BoardFindUseCase } from '../usecases/board/BoardFindUseCase';
import { BoardCreateUseCase } from '../usecases/board/BoardCreateUseCase';
import { BoardCreateRequest } from '../requests/board/BoardCreateRequest';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { BoardUpdateRequest } from '../requests/board/BoardUpdateRequest';
import { BoardUpdatePublishedRequest } from '../requests/board/BoardUpdatePublishedRequest';
import { BoardUpdateUseCase } from '../usecases/board/BoardUpdateUseCase';
import { BoardDetailRequest } from '../requests/board/BoardDetailRequest';
import { BoardResponse } from '../response/board/BoardResponse';
import { BoardResponseArray } from '../response/board/BoardResponseArray';
import { BoardUserInviteRequest } from '../requests/board/BoardUserInviteRequest';
import { BoardUserInviteUseCase } from '../usecases/board/BoardUserInviteUseCase';
import { BoardUserRemoveRequest } from '../requests/board/BoardUserRemoveRequest';
import { BoardUserRemoveUseCase } from '../usecases/board/BoardUserRemoveUseCase';
import { BoardSearchRequest } from '../requests/board/BoardSearchRequest';
import { TaskFindUseCase } from '../usecases/task/TaskFindUseCase';
import { TaskListsRequest } from '../requests/task/BoardSearchRequest';

export class BoardController {
  // ボード一覧
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.user);
      
      if (!req.user) {
        throw new UnauthorizedException();
      }

      const request = new BoardSearchRequest(req.query);
      const result = await new BoardFindUseCase().getAllwithUsers(req.user.id, request.search);
      const response = new BoardResponseArray(result).getResponse();
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  // 詳細
  async detail(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new BoardDetailRequest(req.params);
      const result = await new BoardFindUseCase().getDetail(request);
      const response = new BoardResponse(result).getResponse();
      return res.json(response);
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

  // 更新
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new BoardUpdateRequest(req.body);

      if (!req.user) {
        throw new UnauthorizedException();
      }

      const result = await new BoardUpdateUseCase().update(
        request,
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
      console.log(result);

      const response = new BoardResponse(result).getResponse();
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  // ユーザー招待
  async inviteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new BoardUserInviteRequest(req.body);

      if (!req.user) {
        throw new UnauthorizedException();
      }

      const result = await new BoardUserInviteUseCase().invite(
        request.boardId,
        request.userIds
      );
      console.log(result);

      const response = new BoardResponse(result).getResponse();

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  // ユーザー除外
  async removeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new BoardUserRemoveRequest(req.query);

      if (!req.user) {
        throw new UnauthorizedException();
      }

      const result = await new BoardUserRemoveUseCase().remove(
        request.boardId,
        request.userId
      );
      console.log(result);

      const response = new BoardResponse(result).getResponse();

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}
