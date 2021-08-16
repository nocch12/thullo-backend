import { Board, PrismaClient, TaskList } from '@prisma/client';

export class TaskListCreateUseCase {
  private taskList;
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.taskList = prisma.taskList;
    this.board = prisma.board;
  }

  async create(boardId: Board['id'],listName: TaskList['listName']) {
    const order = await this.getOrderMax(boardId);

    const list = await this.taskList.create({
      data: {
        boardId,
        listName,
        order,
      }
    })

    return list;
  }

  async getOrderMax(boardId: Board['id']) {
    const count = await this.board.findUnique({
      where: {
        id: boardId,
      },
      include: {
        _count: {
          select: {
            TaskList: true,
          }
        }
      }
    })

    return count?._count?.TaskList || 0;
  }
}
