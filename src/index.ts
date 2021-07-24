import express, { NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import { cors } from './middleware/cors';
import { csurf } from './middleware/csrf';
import { csrfHandler, errorHandler } from './exceptions/errorHandler';
import { NotFoundException } from './exceptions/NotFoundException';

import routes from './routes/routes';


dotenv.config();
const app = express();

// -------- X-Powered-Byヘッダの無効化 -------- //
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors);
app.use(csurf);

// csrfトークンの確認
app.use(csrfHandler);

routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  throw new NotFoundException();
});

// error handler
app.use(errorHandler);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`);
});
