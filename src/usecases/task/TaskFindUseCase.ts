import { Board, PrismaClient } from '@prisma/client';

export class TaskFindUseCase {
  private taskList;
  constructor() {
    const prisma = new PrismaClient();
    this.taskList = prisma.taskList;
  }

  async getTaskLists(boardId: Board['id']) {
    const taskLists = await this.taskList.findMany({
      where: {
        boardId: boardId,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return taskLists;
  }
}
