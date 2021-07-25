import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { responseUser } from '../../response/user/user';

dotenv.config();

export class UserLoginUseCase {
  createToken(user: responseUser) {
    const token = jwt.sign(user, process.env.APP_SECRET as string);

    return token;
  }
}
