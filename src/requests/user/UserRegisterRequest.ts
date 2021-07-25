import { Request } from 'express';
import { HttpException } from '../../exceptions/HttpException';

type Body = {
  name: string;
  email: string;
  password: string;
};

export interface IUserRegisterRequest extends Request {}

export class UserRegisterRequest {
  public name: string;
  public email: string;
  public password: string;

  constructor(body: Body) {
    this.validrequest(body);

    this.name = body.name;
    this.email = body.email;
    this.password = body.password;
  }

  validrequest(body: Body) {
    console.log(body);
    
    const { name, email, password } = body;
    if (!name) {
      console.log(0, name);
      
      throw new HttpException(422, 'name', {});
    }
    if (!email || email.length < 4) {
      throw new HttpException(422, 'email', {});
    }
    if (!password || password.length < 4) {
      throw new HttpException(422, 'password', {});
    }
  }
}
