import { PrismaClient } from '@prisma/client';

export class BoardFindUseCase {
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.board = prisma.board;
  }

  async findAllwithUsers() {
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
}
