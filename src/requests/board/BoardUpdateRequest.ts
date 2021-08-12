import { HttpException } from '../../exceptions/HttpException';

type Body = {
  boardId: number;
  boardName?: string;
  description?: string;
  published?: boolean;
};

export class BoardUpdateRequest {
  public boardId;
  public boardName;
  public description;
  public published;

  constructor(body: Body) {
    this.validrequest(body);
    this.boardId = body.boardId;
    this.boardName = body.boardName;
    this.description = body.description;
    this.published = body.published;
  }

  validrequest(body: Body) {
    const { boardId } = body;

    if (!boardId) {
      throw new HttpException(422, 'boardId', {});
    }
  }

  validParams() {
    return {
      boardName: this.boardName,
      description: this.description,
      published: this.published,
    };
  }

  private isUndefined(value: any) {
    return value === undefined;
  }
}
