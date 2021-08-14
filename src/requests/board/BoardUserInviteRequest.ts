import { Board, User } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

type Body = {
  boardId: Board['id'];
  userIds: User['id'][];
};

export class BoardUserInviteRequest {
  public boardId;
  public userIds: User['id'][];

  constructor(body: Body) {
    this.validrequest(body);
    this.boardId = body.boardId;
    const ids = body.userIds || [];
    this.userIds = ids.map(id => Number(id));
  }

  validrequest(body: Body) {
    const { userIds } = body;

  }
}
