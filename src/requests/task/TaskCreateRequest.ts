import { Task, TaskList } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

type Params = {
  listId?: TaskList['id'];
  taskName?: Task['taskName'];
  order?: Task['order'];
};

export class TaskCreateRequest {
  public listId;
  public taskName;
  public order;

  constructor(params: Params) {
    this.validrequest(params);

    this.listId = params.listId ? Number(params.listId) : 0;
    this.taskName = params.taskName || '';
    this.order = params.order || 0;
  }

  validrequest(params: Params) {
    const { listId } = params;
    // throw new HttpException(403,'', {});
  }
}
