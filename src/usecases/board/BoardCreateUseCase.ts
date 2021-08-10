import { PrismaClient } from '@prisma/client';
import { BoardCreateRequest } from '../../requests/board/BoardCreateRequest';
import { ResUser } from '../../response/user/ResUser';

export class BoardCreateUseCase {
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.board = prisma.board;
  }

  async create(boardReq: BoardCreateRequest, user: ResUser) {
    const board = await this.board.create({
      data: {
        boardName: boardReq.boardName,
        imagePath: boardReq.imagePath,
        published: boardReq.published,
        authorId: user.id,
        UsersOnBoards: {
          create: { userId: user.id },
        },
      },
    });

    return board;
  }
}
