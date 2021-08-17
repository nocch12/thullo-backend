import { TaskList } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

type Params = {
  listId?: TaskList['id'];
};

export class TaskListDeleteRequest {
  public listId;

  constructor(params: Params) {
    this.validrequest(params);

    this.listId = params.listId || 0;
  }

  validrequest(params: Params) {
    const { listId } = params;
    // throw new HttpException(403,'', {});
  }
}
