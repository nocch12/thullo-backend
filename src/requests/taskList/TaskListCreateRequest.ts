import { Board, TaskList } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

type Params = {
  boardId?: Board['id'];
  listName?: TaskList['listName'];
  order?: TaskList['order'];
};

export class TaskListCreateRequest {
  public boardId;
  public listName;
  public order;

  constructor(params: Params) {
    this.validrequest(params);

    this.boardId = params.boardId ? Number(params.boardId) : 0;
    this.listName = params.listName || '';
    this.order = params.order || 0;
  }

  validrequest(params: Params) {
    const { boardId } = params;
    // throw new HttpException(403,'', {});
  }
}
