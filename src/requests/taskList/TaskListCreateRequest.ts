import { Board, TaskList } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

type Params = {
  boardId?: Board['id'];
  listName?: TaskList['listName'];
};

export class TaskListCreateRequest {
  public boardId;
  public listName;

  constructor(params: Params) {
    this.validrequest(params);

    this.boardId = params.boardId ? Number(params.boardId) : 0;
    this.listName = params.listName || '';
  }

  validrequest(params: Params) {
    const { boardId } = params;
    // throw new HttpException(403,'', {});
  }
}
