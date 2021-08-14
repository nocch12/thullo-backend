import { Board, PrismaClient, User } from '@prisma/client';
import { ForbiddenException } from '../../exceptions/ForbiddenException';
import { BoardUpdatePublishedRequest } from '../../requests/board/BoardUpdatePublishedRequest';
import { BoardUpdateRequest } from '../../requests/board/BoardUpdateRequest';
import { ResUser } from '../../response/user/ResUser';
import { selectWithUser } from './types';

export class BoardUserInviteUseCase {
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.board = prisma.board;
  }

  async invite(boardId: Board['id'], userIds: User['id'][]) {
    // const isAuthor = this.isAuthor(boardReq.boardId, user.id);

    // if (!isAuthor) {
    //   throw new ForbiddenException();
    // }

    const board = await this.board.update({
      where: { id: boardId },
      data: {
        UsersOnBoards: {
          createMany: {
            data: userIds.map(id => ({userId: id}))
          }
        }
      },
      select: selectWithUser
    });

    return board;
  }
}
