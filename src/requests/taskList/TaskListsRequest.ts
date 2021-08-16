import { Board } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

type Params = {
  boardId?: Board['id'];
};

export class TaskListsRequest {
  public boardId;

  constructor(params: Params) {
    console.log(params);
    
    this.validrequest(params);

    this.boardId = params.boardId ? Number(params.boardId) : 0;
  }

  validrequest(params: Params) {
    const { boardId } = params;
  }
}
