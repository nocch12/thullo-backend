import { User } from '@prisma/client';
import { Request } from 'express';
import { HttpException } from '../../exceptions/HttpException';

type Query = {
  q?: string;
  excludeIds?: string[];
};

export class UserSearchRequest {
  public q: string;
  public excludeIds: User['id'][];

  constructor(query: Query) {
    this.validrequest(query);

    this.q = query.q || '';

    const ids = query.excludeIds || [];
    this.excludeIds = ids.map(id => Number(id));
  }

  validrequest(query: Query) {
    const { q, excludeIds } = query;
  }
}
