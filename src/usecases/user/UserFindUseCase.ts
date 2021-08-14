import { PrismaClient, User } from '@prisma/client';

export class UserFindUseCase {
  private user;
  constructor() {
    const prisma = new PrismaClient();
    this.user = prisma.user;
  }

  async searchByName(name?: string, excludeIds?: User['id'][]) {
    console.log(name);
    
    const userList = await this.user.findMany({
      take: 10,
      select: {
        id: true,
        name: true,
        imagePath: true,
      },
      where: {
        name: {
          contains: name,
        },
        id: {
          notIn: excludeIds,
        },
      },
    });

    return userList;
  }
}
