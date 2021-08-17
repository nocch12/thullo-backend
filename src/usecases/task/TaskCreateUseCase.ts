import { Board, PrismaClient, Task, TaskList } from '@prisma/client';

export class TaskCreateUseCase {
  private task;
  constructor() {
    const prisma = new PrismaClient();
    this.task = prisma.task;
  }

  async createTask(
    listId: TaskList['id'],
    taskName: Task['taskName'],
    order: Task['order'],
    authorId: Task['authorId']
  ) {
    const task = await this.task.create({
      data: {
        listId,
        taskName,
        order,
        authorId,
      },
    });

    return task;
  }
}
