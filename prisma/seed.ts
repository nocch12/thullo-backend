import { PrismaClient } from '@prisma/client';
import userSeed from './seeds/userSeed';
import boardSeed from './seeds/boardSeed';
import taskListSeed from './seeds/taskListSeed';
import taskSeed from './seeds/taskSeed';

const prisma = new PrismaClient();

const seed = async () => {
  // ユーザー作成
  const users = await userSeed();

  for (const user of users) {
    // ボード作成
    const boards = await boardSeed(user);

    for (const board of boards) {
      // リスト作成
      const lists = await taskListSeed(board);

      for (const list of lists) {
        // タスク作成
        const tasks = await taskSeed(user, list);
        console.log({ users, boards, lists, tasks });
      }
    }
  }

  return users;
};

seed()
  .then((res) => {
    console.log('end');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit();
  });
