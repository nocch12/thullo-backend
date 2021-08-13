import { Board, User, UsersOnBoards } from '@prisma/client';

export type TPrismaSelected = null | (Partial<Board> & {
      UsersOnBoards?: (Partial<UsersOnBoards> & {
        user?: Partial<User>;
      })[];
      author?: Partial<User>;
    });

export type TBoardResponse = Partial<Board> & {
  users?: Partial<User>[];
  author?: Partial<User>;
};

export class BoardResponse {
  private response: TBoardResponse;

  constructor(selected: TPrismaSelected) {
    const users = this.formatUsers(selected);

    this.response = {
      ...selected,
      users,
      author: selected?.author,
    };
  }

  formatUsers(selected: TPrismaSelected) {
    const users = selected?.UsersOnBoards?.map(({ user }) => user);
    return users?.filter((u): u is User => typeof u !== undefined);
  }

  getResponse() {
    return this.response;
  }
}
