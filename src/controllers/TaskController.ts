import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { TaskCreateRequest } from '../requests/task/TaskCreateRequest';
import { TaskCreateUseCase } from '../usecases/task/TaskCreateUseCase';

export class TaskController {
  // 作成
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedException();
      }

      const request = new TaskCreateRequest({...req.params, ...req.body});
      const result = await new TaskCreateUseCase().createTask(request.listId, request.taskName, request.order, req.user.id);
      // const response = new BoardResponse(result).getResponse();
      // return res.json(response);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
