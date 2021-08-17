import { Board, PrismaClient, TaskList } from '@prisma/client';

export class TaskListCreateUseCase {
  private taskList;
  constructor() {
    const prisma = new PrismaClient();
    this.taskList = prisma.taskList;
  }

  async create(boardId: Board['id'],listName: TaskList['listName'], order: TaskList['order']) {
    const list = await this.taskList.create({
      data: {
        boardId,
        listName,
        order,
      }
    })

    return list;
  }
}
