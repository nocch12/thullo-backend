import { PrismaClient, User } from '@prisma/client';
import { BoardDetailRequest } from '../../requests/board/BoardDetailRequest';
import { selectWithUser } from './types';

export class BoardFindUseCase {
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.board = prisma.board;
  }

  async getAllwithUsers(authorId: User['id'], search?: string) {
    const boardList = await this.board.findMany({
      where: {
        AND: [
          ...this.getSearchQuery(search),
          { OR: [{ authorId }, { published: true }] },
        ],
      },
      include: selectWithUser,
    });

    return boardList;
  }

  async getDetail(req: BoardDetailRequest) {
    const board = await this.board.findUnique({
      where: { id: req.boardId },
      include: selectWithUser,
    });

    return board;
  }

  getSearchQuery(query: string | undefined) {
    const multiQuery = query?.split(/\s/);

    if (!multiQuery || !multiQuery[0]) return [];

    return multiQuery.map((q) => {
      return {
        boardName: {
          contains: q,
        },
      };
    });
  }
}
