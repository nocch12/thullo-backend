import { NextFunction, Request, Response } from 'express'

export class HttpException<T = {}> extends Error {
  code?: number;
  message: string;
  data: T;

  constructor(code: number = 200, message: string, data: T) {
    super(message);
    this.code = code;
    this.message = message;
    this.data = data;
  }
}