import { PrismaClient, User } from '@prisma/client';
import { hasher } from '../../src/libs/hasher';

const prisma = new PrismaClient();

const userSeed = async () => {
  const created: User[] = [];
  for (let i = 0; i < 3; i++) {
    const user = await prisma.user.create({
      data: {
        email: `seed${i}@example.com`,
        name: `seed${i}`,
        password: hasher.hash('password'),
      },
    });
    created.push(user);
  }
  return created;
};

export default userSeed;
