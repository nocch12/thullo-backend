import { ResUser } from '../response/user/ResUser';

declare global {
  namespace Express {
    interface User extends ResUser {}
  }
}
