import { PrismaClient, User } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

import { hasher } from '../../libs/hasher';
export class UserRegisterUseCase {
  private user;
  constructor() {
    const prisma = new PrismaClient();
    this.user = prisma.user;
  }

  async register(name: string, email: string, password: string) {
    if (await this.duplicateEmail(email)) {
      throw new HttpException(422, 'Duplicate Email', {});
    }

    const user = await this.user.create({
      data: {
        name,
        email,
        password: hasher.hash(password),
      },
    });

    return this.responseUser(user);
  }

  async duplicateEmail(email: string) {
    const user = await this.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  responseUser(user: User) {
    const { password, ...res } = user;
    return res;
  }
}
