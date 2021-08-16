import { HttpException } from '../../exceptions/HttpException';

type Params = {
  search?: string;
};

export class BoardSearchRequest {
  public search;

  constructor(params: Params) {
    this.validrequest(params);

    this.search = params.search;
  }

  validrequest(params: Params) {
    const { search } = params;
  }
}
