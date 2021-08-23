import { Board, TaskList } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

type Params = {
  listId?: TaskList['id'];
  listName?: TaskList['listName'];
  order?: TaskList['order'];
};

export class TaskListUpdateRequest {
  public listId;
  public listName;
  public order;

  constructor(params: Params) {
    this.validrequest(params);

    this.listId = params.listId ? Number(params.listId) : 0;
    this.listName = params.listName;
    this.order = params.order;
    console.log({params});
    
  }

  validrequest(params: Params) {
    const { listId } = params;
    // throw new HttpException(403,'', {});
  }
}
