import { PrismaClient, Board } from '@prisma/client';
import { HttpException } from '../../exceptions/HttpException';

export class BoardFindUseCase {
  private board;
  constructor() {
    const prisma = new PrismaClient();
    this.board = prisma.board;
  }

  async findAll() {
    const boardList = await this.board.findMany();
    return boardList;
  }
}
