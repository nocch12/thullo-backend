import { Board, PrismaClient } from '@prisma/client';

export class TaskFindUseCase {
  private taskList;
  constructor() {
    const prisma = new PrismaClient();
    this.taskList = prisma.taskList;
  }

  async getTaskLists(boardId: Board['id']) {
    const taskLists = await this.taskList.findMany({
      include: {
        Task: {
          // select: {
          //   id: true,
          // },
          include: {
            _count: {
              select: {
                TaskComment: true,
                TaskFile: true,
              },
            },
            LabelsOnTasks: {
              include: {
                label: true,
              },
            },
            UsersOnTasks: {
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
          orderBy: {
            order: 'asc'
          }
        },
      },
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
