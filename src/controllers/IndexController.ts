import { IndexRequest } from '../requests/IndexRequest'

export class IndexController {
  async index(req: IndexRequest) {
    return { title: 'Express' };
  }
}
