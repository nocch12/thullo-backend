import { Board, User } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

type Params = {
  boardId?: Board['id'];
  userId?: User['id'];
};

export class BoardUserRemoveRequest {
  public boardId;
  public userId;

  constructor(params: Params) {
    this.validrequest(params);
    this.boardId = Number(params.boardId);
    this.userId = Number(params.userId);
  }

  validrequest(params: Params) {
    const { boardId, userId } = params;
    if (!boardId) {
      throw new HttpException(422, 'boardId', {});
    }
    if (!userId) {
      throw new HttpException(422, 'userId', {});
    }
  }
}
