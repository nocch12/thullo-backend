import { HttpException } from './HttpException';

export class UnauthorizedException extends HttpException {
  constructor() {
    super(401, 'Unauthorized', {});
  }
}
