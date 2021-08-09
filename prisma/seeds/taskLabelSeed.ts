import { PrismaClient } from '@prisma/client';

const COLOR0 = '00';

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const taskLabelSeed = async (prisma: PrismaClient) => {
  const created = ids.map(async (id) => {
    const colorId = Math.floor(Math.random() * 9);

    return await prisma.taskLabel.create({
      data: {
        id,
        labelName: `ラベル${id}`,
        color: `${COLOR0}${colorId}`,
      },
    });
  });
  return created;
};

export default taskLabelSeed;
