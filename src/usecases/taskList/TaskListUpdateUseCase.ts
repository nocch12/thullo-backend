import { Board, PrismaClient, TaskList } from '@prisma/client';

export class TaskListUpdateUseCase {
  private taskList;
  constructor() {
    const prisma = new PrismaClient();
    this.taskList = prisma.taskList;
  }

  async update(listId: TaskList['id'], listName?: TaskList['listName'], order?: TaskList['order']) {
    const list = await this.taskList.update({
      where: {
        id: listId
      },
      data: {
        listName,
        order,
      }
    })

    return list;
  }
}
