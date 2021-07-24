import { Request, Response, NextFunction } from 'express'
import { HttpException } from './HttpException';
import { CsrfException } from './CsrfException';

// csurfのエラーならException
export const csrfHandler = (err: {code: string}, req: Request, res: Response, next: NextFunction) => {
  if (err.code = "EBADCSRFTOKEN") {
    throw new CsrfException;
  }
  next();
}

// 全体のエラーハンドラー
export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(err.code || 500).json(err);
}