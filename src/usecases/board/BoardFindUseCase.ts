import { PrismaClient } from '@prisma/client';
import { BoardDetailRequest } from '../../requests/board/BoardDetailRequest';
import { selectWithUser } from './types';

export class BoardFindUseCase {
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.board = prisma.board;
  }

  async getAllwithUsers() {
    const boardList = await this.board.findMany({
      include: selectWithUser,
    });

    const res = boardList.map((b) => {
      return {
        ...b,
        users: b.UsersOnBoards?.map((u) => u.user),
      };
    });
    return res;
  }

  async getDetail(req: BoardDetailRequest) {
    const board = await this.board.findUnique({
      where: { id: req.boardId },
      include: selectWithUser,
    });

    return {
      ...board,
      users: board?.UsersOnBoards.map((u) => u.user) || [],
    };
  }
}
