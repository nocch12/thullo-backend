import { PrismaClient, User, Board } from '@prisma/client';

const prisma = new PrismaClient();

const boardSeed = async (user: User) => {
  const rand = Math.floor(Math.random() * 2);

  const created: Board[] = [];

  for (let i = 0; i < rand; i++) {
    const board = await prisma.board.create({
      data: {
        boardName: `ボード${user.id}${i}`,
        description: `ボード${user.id}${i}\nです。`,
        authorId: user.id,
        published: true,
        UsersOnBoards: {
          create: {
            userId: user.id
          }
        }
      },
    });

    created.push(board);
  }
  return created;
};

export default boardSeed;
