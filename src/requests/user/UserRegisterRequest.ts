import { Request } from 'express'

export interface UserRegisterRequest extends Request<{
  email: string;
  password: string;
}> {};