import { BoardResponse, TPrismaSelected, TBoardResponse } from './BoardResponse';

export class BoardResponseArray {
  private response: TBoardResponse[] = [];

  constructor(selected: TPrismaSelected[]) {
    selected.map(s => {
      const res = new BoardResponse(s).getResponse();
      this.response.push(res);
    }) 
  }

  getResponse() {
    return this.response;
  }
}
