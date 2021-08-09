import { PrismaClient, Board, TaskList } from '@prisma/client';

const prisma = new PrismaClient();

const taskListSeed = async (board: Board) => {
  const rand = Math.floor(Math.random() * 4) + 1;

  const created: TaskList[] = [];
  
  for (let i = 0; i < rand; i++) {
    const list = await prisma.taskList.create({
      data: {
        listName: 'リスト',
        boardId: board.id,
      },
    });
    created.push(list);
  }
  return created;
};

export default taskListSeed;