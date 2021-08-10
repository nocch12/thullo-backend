import { Board, PrismaClient, User } from '@prisma/client';
import { ForbiddenException } from '../../exceptions/ForbiddenException';
import { BoardUpdatePublishedRequest } from '../../requests/board/BoardUpdatePublishedRequest';
import { ResUser } from '../../response/user/ResUser';

export class BoardUpdateUseCase {
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.board = prisma.board;
  }

  async updatePubleshed(boardReq: BoardUpdatePublishedRequest, user: ResUser) {
    const isAuthor = this.isAuthor(boardReq.boardId, user.id);

    if (!isAuthor) {
      throw new ForbiddenException();
    }

    const board = await this.board.update({
      where: { id: boardReq.boardId },
      data: {
        published: boardReq.published
      },
    });

    return board;
  }

  async isAuthor(boardId: Board['id'], userId: User['id']) {
    const board = await this.board.findFirst({
      where: {
        id: boardId,
        authorId: userId
      }
    });
    return board;
  }
}
