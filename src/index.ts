import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';

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
app.use(cookieParser(process.env.APP_SECRET));
app.use(cors);
app.use(csurf);

// csrfトークンの確認
app.use(csrfHandler);

// passport設定
app.use(passport.initialize());

// ルーティング設定
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
