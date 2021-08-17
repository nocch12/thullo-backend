import { Board, PrismaClient, TaskList, User } from '@prisma/client';

export class TaskListDeleteUseCase {
  private taskList;
  constructor() {
    const prisma = new PrismaClient();
    this.taskList = prisma.taskList;
  }

  async delete(listId: TaskList['id'], userId: User['id']) {
    const list = await this.taskList.delete({
      where: {
        id: listId,
      },
      include: { Task: true },
    });

    return list;
  }
}
