import { HttpException } from '../../exceptions/HttpException';

type Body = {
  boardId: number;
  published: boolean;
};

export class BoardUpdatePublishedRequest {
  public boardId: number;
  public published: boolean;

  constructor(body: Body) {
    this.validrequest(body);
    this.boardId = body.boardId;
    this.published = body.published;
    
  }

  validrequest(body: Body) {
    const { boardId, published } = body;
    
    if (!boardId) {
      throw new HttpException(422, 'boardId', {});
    }
  }
}
