import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserRegisterRequest } from '../requests/user/UserRegisterRequest';
import { hasher } from '../libs/hasher';

const prisma = new PrismaClient();

export class UserController {
  async register(req: UserRegisterRequest) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.create({
        data: {
          email,
          password: hasher.hash(password),
          name: 'test',
        },
      });
      await prisma.$disconnect();
      return { user };
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: Request) {
    try {
      const user = req.user;

      return { user };
    } catch (error) {
      console.log(error);
    }
  }

  async me(req: UserRegisterRequest) {
    return { me: 1 };
  }
}
