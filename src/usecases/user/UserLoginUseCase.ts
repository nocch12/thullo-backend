import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ResUser } from '../../response/user/ResUser';

dotenv.config();

export class UserLoginUseCase {
  createToken(user: ResUser) {
    const token = jwt.sign(user, process.env.APP_SECRET as string);

    return token;
  }
}
