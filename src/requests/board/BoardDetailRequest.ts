import { HttpException } from '../../exceptions/HttpException';

type Params = {
  boardId?: string;
};

export class BoardDetailRequest {
  public boardId: number;

  constructor(params: Params) {
    this.validrequest(params);

    this.boardId = Number(params.boardId);
  }

  validrequest(params: Params) {
    const { boardId } = params;
    
    if (!boardId) {
      throw new HttpException(422, 'boardId', {
        boardId,
        message: 'boardIdがありません。'
      });
    }
    if (boardId.slice(0, 1) === '0') {
      throw new HttpException(422, 'boardId', {
        boardId,
        message: 'boardIdは1以上の整数である必要があります。'
      });
    }
    if (!Number.isInteger(Number(boardId))) {
      throw new HttpException(422, 'boardId', {
        boardId,
        message: 'boardIdが整数ではありません。'
      });
    }
  }
}
