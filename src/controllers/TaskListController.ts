import { Request, Response, NextFunction } from 'express';
import { TaskFindUseCase } from '../usecases/task/TaskFindUseCase';
import { TaskListsRequest } from '../requests/taskList/TaskListsRequest';
import { TaskListCreateRequest } from '../requests/taskList/TaskListCreateRequest';
import { TaskListCreateUseCase } from '../usecases/taskList/TaskListCreateUseCase';
import { TaskListDeleteRequest } from '../requests/taskList/TaskListDeleteRequest';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { TaskListDeleteUseCase } from '../usecases/taskList/TaskListDeleteUseCase';

export class TaskListController {
  // リスト一覧
  async taskList(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new TaskListsRequest(req.params);
      const result = await new TaskFindUseCase().getTaskLists(request.boardId);
      // const response = new BoardResponse(result).getResponse();
      // return res.json(response);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  // 作成
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new TaskListCreateRequest({...req.params, ...req.body});
      const result = await new TaskListCreateUseCase().create(request.boardId, request.listName, request.order);
      // const response = new BoardResponse(result).getResponse();
      // return res.json(response);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  // 削除
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedException();
      }

      const request = new TaskListDeleteRequest({...req.body});
      const result = await new TaskListDeleteUseCase().delete(request.listId, req.user.id);
      // const response = new BoardResponse(result).getResponse();
      // return res.json(response);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
