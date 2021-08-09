import { PrismaClient, User, Task, TaskList } from '@prisma/client';

const prisma = new PrismaClient();

const taskSeed = async (user: User, list: TaskList) => {
  const rand = Math.floor(Math.random() * 4) + 1;
  const created: Task[] = [];

  for (let i = 0; i < rand; i++) {
    const task = await prisma.task.create({
      data: {
        taskName: `タスク`,
        description: `タスク\nです`,
        order: i,
        listId: list.id,
        authorId: user.id,
      },
    });
    created.push(task);
  }
  return created;
};

export default taskSeed;
