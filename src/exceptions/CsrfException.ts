import { HttpException } from './HttpException';
export class CsrfException extends HttpException {
  constructor() {
    super(403, 'Invalid csrf token', {});
  }
}
