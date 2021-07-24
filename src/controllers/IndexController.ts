import { IndexRequest } from '../requests/IndexRequest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class IndexController {
  async index(req: IndexRequest) {
    try {
      // const users = await prisma.user.findFirst();
      // await prisma.$disconnect();
      return { a: 1 };
    } catch (error) {
      console.log(error);
    }
  }
}
