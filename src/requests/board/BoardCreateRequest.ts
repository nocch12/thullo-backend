import { HttpException } from '../../exceptions/HttpException';

type Body = {
  boardName: string;
  imagePath: string;
  published: boolean;
};

export class BoardCreateRequest {
  public boardName: string;
  public imagePath: string;
  public published: boolean;

  constructor(body: Body) {
    this.validrequest(body);

    this.boardName = body.boardName;
    this.imagePath = body.imagePath;
    this.published = body.published;
  }

  validrequest(body: Body) {
    const { boardName, imagePath, published } = body;
    
    if (!boardName) {
      throw new HttpException(422, 'boardName', {});
    }
  }
}
