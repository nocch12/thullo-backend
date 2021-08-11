import { PrismaClient } from '@prisma/client';
import { BoardDetailRequest } from '../../requests/board/BoardDetailRequest';

export class BoardFindUseCase {
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.board = prisma.board;
  }

  async getAllwithUsers() {
    const boardList = await this.board.findMany({
      include: {
        UsersOnBoards: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imagePath: true,
              },
            },
          },
        },
      },
    });

    const res = boardList.map((b) => {
      return {
        ...b,
        users: b.UsersOnBoards.map((u) => u.user),
      };
    });
    return res;
  }

  async getDetail(req: BoardDetailRequest) {
    const board = await this.board.findUnique({
      where: { id: req.boardId },
      include: {
        UsersOnBoards: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imagePath: true,
              },
            },
          },
        },
      },
    });

    return board;
  }
}
