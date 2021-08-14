import { Board, PrismaClient, User } from '@prisma/client';
import { ForbiddenException } from '../../exceptions/ForbiddenException';
import { BoardUpdatePublishedRequest } from '../../requests/board/BoardUpdatePublishedRequest';
import { BoardUpdateRequest } from '../../requests/board/BoardUpdateRequest';
import { ResUser } from '../../response/user/ResUser';
import { selectWithUser } from './types';

export class BoardUserRemoveUseCase {
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.board = prisma.board;
  }

  async remove(boardId: Board['id'], userId: User['id']) {
    // const isAuthor = this.isAuthor(boardReq.boardId, user.id);

    // if (!isAuthor) {
    //   throw new ForbiddenException();
    // }

    const board = await this.board.update({
      where: { id: boardId },
      data: {
        UsersOnBoards: {
          deleteMany: {
            boardId,
            userId,
          }
        }
      }
    });

    return board;
  }
}
